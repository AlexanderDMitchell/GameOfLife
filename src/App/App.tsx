import './App.css'

import React, { useReducer } from 'react'

import { Grid } from './components/Grid/Grid'
import { Navbar } from './components/Navbar/Navbar'

type Grid = (0 | 1)[][]

const grid: Grid = [
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
  grid: Grid
}

type Action = {
  type: 'toggle-is-playing'
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'toggle-is-playing':
      return {
        ...state,
        isPlaying: !state.isPlaying
      }
  }
}

const initialState: State = {
  isPlaying: false,
  grid
}

const useGameOfLife = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return { state, dispatch }
}

export function App() {
  const { state, dispatch } = useGameOfLife()
  const toggleIsPlaying = () => dispatch({ type: 'toggle-is-playing' })

  return (
    <div className={'App'}>
      <Navbar isPlaying={state.isPlaying} toggleIsPlaying={toggleIsPlaying} />
      <Grid />
    </div>
  )
}
