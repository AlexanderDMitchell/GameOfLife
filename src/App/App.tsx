import './App.css'

import React from 'react'

import { ColorProvider } from './context/ColorProvider'
import { Game } from './screens/Game/Game'
import { Settings } from './screens/Settings/Settings'
import { useGameOfLife } from './useGameOfLife'

type Screens = 'game' | 'settings'

export function App() {
  const {
    state,
    dispatch,
    toggleIsPlaying,
    createFullScreenGrid,
    toggleCellFill
  } = useGameOfLife()

  const Screen = state.screen === 'game' ? Game : Settings

  return (
    <ColorProvider>
      <div className={'App'}>
        <Screen
          {...{
            state,
            dispatch,
            toggleIsPlaying,
            createFullScreenGrid,
            toggleCellFill
          }}
        />
      </div>
    </ColorProvider>
  )
}
