import './App.css'

import React, { useReducer } from 'react'

import { CellCoordinates, GridData } from './types'

type State = {
  grid: GridData
  isPlaying: boolean
  generationHasPassed: boolean
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
    }
  | {
      type: 'generation-has-passed'
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
        generationHasPassed: false
      }

    case 'generation-has-passed':
      return {
        ...state,
        generationHasPassed: true
      }
  }
}

const initialState: State = {
  grid: [],
  isPlaying: false,
  generationHasPassed: false
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

  const createFullScreenGrid = (addGlider = false) => {
    const navbarHeight = 50
    const cellSize = 20

    const padding = 20
    const height = window.innerHeight - navbarHeight - padding
    const width = window.innerWidth - padding

    const maxNumberOfRows = Math.floor(height / cellSize)
    const maxNumberOfColumns = Math.floor(width / cellSize)

    const grid = createGrid(maxNumberOfRows, maxNumberOfColumns)

    if (addGlider && grid.length >= 3 && grid[0].length >= 3) {
      addGliderToGrid(grid)
    }

    dispatch({ type: 'set-grid', grid })
  }

  React.useEffect(() => {
    if (state.grid.length) {
      return
    }
    createFullScreenGrid(true)
  })

  React.useEffect(() => {
    if (!state.isPlaying || !state.generationHasPassed) {
      return
    }
    const grid = play(state.grid)
    dispatch({ type: 'set-grid', grid })
  }, [dispatch, state.isPlaying, state.grid, state.generationHasPassed])

  React.useEffect(() => {
    if (!state.isPlaying) {
      return
    }

    const interval = setInterval(() => {
      dispatch({ type: 'generation-has-passed' })
    }, 500)

    return () => clearInterval(interval)
  }, [state.isPlaying, dispatch])

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

const createGrid = (rows: number, columns: number) => {
  const grid: GridData = []

  for (let row = 0; row < rows; row++) {
    grid.push([])

    for (let col = 0; col < columns; col++) {
      grid[row].push(0)
    }
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
