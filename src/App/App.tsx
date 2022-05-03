import './App.css'

import React, { useReducer } from 'react'

import { Grid } from './components/Grid/Grid'
import { Navbar } from './components/Navbar/Navbar'
import { CellCoordinates, GridData } from './types'

const initialGrid: GridData = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

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
  }
}

const cloneGrid = (grid: GridData) => {
  return grid.map((row) => {
    return row.slice()
  })
}

const initialState: State = {
  isPlaying: false,
  grid: initialGrid
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

  return (
    <div className={'App'}>
      <Navbar isPlaying={state.isPlaying} toggleIsPlaying={toggleIsPlaying} />
      <Grid grid={state.grid} toggleCellFill={toggleCellFill} />
    </div>
  )
}
