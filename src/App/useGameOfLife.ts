import './App.css'

import React, { useReducer } from 'react'

import { CellCoordinates, GridData } from './types'

type Screen = 'game' | 'settings'

type State = {
  grid: GridData
  isPlaying: boolean
  generationHasPassed: boolean
  screen: Screen
  generationDuration: number
  cellSize: number
}

type Action =
  | {
      type: 'toggle-is-playing'
    }
  | {
      type: 'toggle-cell'
      coordinates: CellCoordinates
    }
  | {
      type: 'set-grid'
      grid: GridData
      keepPlaying: boolean
    }
  | {
      type: 'generation-has-passed'
    }
  | {
      type: 'navigate'
      screen: Screen
    }
  | {
      type: 'update-generation-duration'
      value: number
    }
  | {
      type: 'update-cell-size'
      value: number
    }
  | {
      type: 'restore-default-settings'
    }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'toggle-is-playing':
      return {
        ...state,
        isPlaying: !state.isPlaying
      }

    case 'toggle-cell': {
      const updatedGrid = cloneGrid(state.grid)
      const [row, column] = action.coordinates
      updatedGrid[row][column] = updatedGrid[row][column] ? 0 : 1

      return {
        ...state,
        grid: updatedGrid
      }
    }

    case 'set-grid':
      return {
        ...state,
        grid: action.grid,
        generationHasPassed: false,
        isPlaying: action.keepPlaying
      }

    case 'generation-has-passed':
      return {
        ...state,
        generationHasPassed: true
      }

    case 'navigate':
      return {
        ...state,
        screen: action.screen,
        isPlaying: false
      }

    case 'update-generation-duration':
      return {
        ...state,
        generationDuration: action.value
      }

    case 'update-cell-size':
      return {
        ...state,
        grid: createFullScreenGrid({ cellSize: action.value, addGlider: true }),
        cellSize: action.value
      }

    case 'restore-default-settings': {
      return {
        ...state,
        generationDuration: initialState.generationDuration,
        cellSize: initialState.cellSize,
        screen: 'game',
        grid: createFullScreenGrid({
          cellSize: initialState.cellSize,
          addGlider: true
        })
      }
    }
  }
}

const initialState: State = {
  grid: [],
  isPlaying: false,
  generationHasPassed: false,
  screen: 'game',
  generationDuration: 500,
  cellSize: 20
}

export const useGameOfLife = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const toggleIsPlaying = () => dispatch({ type: 'toggle-is-playing' })

  const toggleCellFill = (coordinates: CellCoordinates) => {
    if (state.isPlaying) {
      return
    }
    dispatch({ type: 'toggle-cell', coordinates })
  }

  React.useEffect(() => {
    if (state.grid.length) {
      return
    }
    const grid = createFullScreenGrid({
      cellSize: state.cellSize,
      addGlider: true
    })
    dispatch({ type: 'set-grid', grid, keepPlaying: false })
  })

  React.useEffect(() => {
    if (!state.isPlaying || !state.generationHasPassed) {
      return
    }
    const grid = play(state.grid)
    dispatch({ type: 'set-grid', grid, keepPlaying: true })
  }, [dispatch, state.isPlaying, state.grid, state.generationHasPassed])

  React.useEffect(() => {
    if (!state.isPlaying) {
      return
    }

    const interval = setInterval(() => {
      dispatch({ type: 'generation-has-passed' })
    }, state.generationDuration)

    return () => clearInterval(interval)
  }, [state.isPlaying, dispatch, state.generationDuration])

  return {
    state,
    dispatch,
    toggleIsPlaying,
    createFullScreenGrid,
    toggleCellFill
  }
}

const getCellValue = (grid: GridData, coordinates: CellCoordinates) => {
  const [row, col] = coordinates

  return grid[row] !== undefined
    ? grid[row][col] !== undefined
      ? grid[row][col]
      : 0
    : 0
}

const play = (gridData: GridData): GridData => {
  const grid = cloneGrid(gridData)
  const updatedGrid = cloneGrid(gridData)
  if (!grid || !grid[0]) {
    return gridData
  }

  const rows = grid.length
  const columns = grid[0].length

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const isLive = getCellValue(grid, [row, col])

      const numberOfNeighbours =
        getCellValue(grid, [row - 1, col - 1]) +
        getCellValue(grid, [row - 1, col]) +
        getCellValue(grid, [row - 1, col + 1]) +
        getCellValue(grid, [row, col - 1]) +
        getCellValue(grid, [row, col + 1]) +
        getCellValue(grid, [row + 1, col - 1]) +
        getCellValue(grid, [row + 1, col]) +
        getCellValue(grid, [row + 1, col + 1])

      // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
      if (isLive && numberOfNeighbours < 2) {
        updatedGrid[row][col] = 0
      }

      // Any live cell with two or three live neighbours lives on to the next generation.

      // Any live cell with more than three live neighbours dies, as if by overpopulation.
      if (isLive && numberOfNeighbours > 3) {
        updatedGrid[row][col] = 0
      }

      // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
      if (!isLive && numberOfNeighbours === 3) {
        updatedGrid[row][col] = 1
      }
    }
  }

  return updatedGrid
}

const createGrid = (rows: number, columns: number, randomise = false) => {
  const grid: GridData = []

  for (let row = 0; row < rows; row++) {
    grid.push([])

    for (let col = 0; col < columns; col++) {
      const value = randomise ? (Math.round(Math.random()) as 0 | 1) : 0
      grid[row].push(value)
    }
  }

  return grid
}

const createFullScreenGrid = ({
  cellSize,
  addGlider = false,
  randomise = false
}: {
  cellSize: number
  addGlider?: boolean
  randomise?: boolean
}) => {
  const navbarHeight = 50

  const padding = 20
  const height = window.innerHeight - navbarHeight - padding
  const width = window.innerWidth - padding

  const maxNumberOfRows = Math.floor(height / cellSize)
  const maxNumberOfColumns = Math.floor(width / cellSize)

  const grid = createGrid(maxNumberOfRows, maxNumberOfColumns, randomise)

  if (addGlider && grid.length >= 3 && grid[0].length >= 3) {
    addGliderToGrid(grid)
  }

  return grid
}

const cloneGrid = (grid: GridData) => {
  return grid.map((row) => {
    return row.slice()
  })
}

const addGliderToGrid = (grid: GridData) => {
  const glider: GridData = [
    [0, 1, 0],
    [0, 0, 1],
    [1, 1, 1]
  ]

  const rows = glider.length
  const columns = glider[0].length

  const startingCoords = [
    Math.floor(grid.length / 2) - 1,
    Math.floor(grid[0].length / 2) - 1
  ]

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      grid[startingCoords[0] + row][startingCoords[1] + col] = glider[row][col]
    }
  }

  return grid
}
