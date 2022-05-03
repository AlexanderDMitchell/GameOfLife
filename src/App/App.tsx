import './App.css'

import React, { useReducer } from 'react'

import { Grid } from './components/Grid/Grid'
import { Navbar } from './components/Navbar/Navbar'
import { CellCoordinates, GridData } from './types'
import { cloneGrid, createGrid } from './utils'

type State = {
  isPlaying: boolean
  grid: GridData
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
        isPlaying: false,
        grid: action.grid
      }
  }
}

const initialState: State = {
  isPlaying: false,
  grid: []
}

const useGameOfLife = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return { state, dispatch }
}

export function App() {
  const { state, dispatch } = useGameOfLife()

  const toggleIsPlaying = () => dispatch({ type: 'toggle-is-playing' })

  const toggleCellFill = (coordinates: CellCoordinates) => {
    if (state.isPlaying) {
      return
    }
    dispatch({ type: 'toggle-cell', coordinates })
  }

  const createFullScreenGrid = () => {
    const navbarHeight = 50
    const cellSize = 20

    const height = window.innerHeight - navbarHeight
    const width = window.innerWidth

    const maxNumberOfRows = Math.floor(height / cellSize)
    const maxNumberOfColumns = Math.floor(width / cellSize)

    const grid = createGrid(maxNumberOfRows, maxNumberOfColumns)

    dispatch({ type: 'set-grid', grid })
  }

  React.useEffect(() => {
    if (state.grid.length) {
      return
    }
    createFullScreenGrid()
  })

  return (
    <div className={'App'}>
      <Navbar
        isPlaying={state.isPlaying}
        toggleIsPlaying={toggleIsPlaying}
        clearGrid={createFullScreenGrid}
      />
      <Grid grid={state.grid} toggleCellFill={toggleCellFill} />
    </div>
  )
}
