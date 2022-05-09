import './Game.css'

import React from 'react'

import { Grid } from '../../components/Grid/Grid'
import { Navbar } from '../../components/Navbar/Navbar'
import { ScreenProps } from '../../types'

export function Game({
  state,
  dispatch,
  toggleIsPlaying,
  createFullScreenGrid,
  toggleCellFill
}: ScreenProps) {
  return (
    <>
      <Navbar>
        <a
          className={'navbar_link'}
          href={`https://en.wikipedia.org/wiki/Conway's_Game_of_Life`}
          target={'_blank'}
          rel={'noreferrer'}>
          Info
        </a>

        <button
          className={`button ${state.isPlaying ? 'button_outline' : ''}`}
          onClick={toggleIsPlaying}>
          {state.isPlaying ? 'Stop' : 'Start'}
        </button>

        <button
          className={'button'}
          onClick={() => {
            const grid = createFullScreenGrid({
              cellSize: state.cellSize,
              randomise: true
            })
            dispatch({ type: 'set-grid', grid, keepPlaying: false })
          }}>
          Randomise
        </button>

        <button
          className={'button'}
          onClick={() => {
            const grid = createFullScreenGrid({ cellSize: state.cellSize })
            dispatch({ type: 'set-grid', grid, keepPlaying: false })
          }}>
          Clear
        </button>

        <button
          className={'button settings_button'}
          onClick={() => dispatch({ type: 'navigate', screen: 'settings' })}>
          &#8942;
        </button>
      </Navbar>

      <Grid
        grid={state.grid}
        toggleCellFill={toggleCellFill}
        cellSize={state.cellSize}
      />
    </>
  )
}
