import './App.css'

import { Grid } from './components/Grid/Grid'
import { Navbar } from './components/Navbar/Navbar'
import { Slider } from './components/Slider/Slider'
import { useGameOfLife } from './useGameOfLife'

export function App() {
  const {
    state,
    dispatch,
    toggleIsPlaying,
    createFullScreenGrid,
    toggleCellFill
  } = useGameOfLife()

  if (state.screen === 'settings') {
    return (
      <div className={'App'}>
        <Navbar>
          <button
            className={'button'}
            onClick={() => dispatch({ type: 'navigate', screen: 'game' })}>
            Back
          </button>
        </Navbar>
        <div className={'settings'}>
          <div className={'settings_item'}>
            <Slider
              label={'Speed'}
              value={-state.generationDuration}
              onChange={(value) => {
                dispatch({ type: 'update-generation-duration', value: -value })
              }}
              min={-3200}
              max={-32}
            />
          </div>

          <div className={'settings_item'}>
            <Slider
              label={'Cell size'}
              value={state.cellSize}
              onChange={(value) => {
                dispatch({ type: 'update-cell-size', value })
              }}
              min={5}
              max={50}
            />
          </div>

          <div className={'settings_item'}>
            <button
              className={'button button_large'}
              onClick={() => {
                dispatch({ type: 'restore-default-settings' })
              }}>
              Restore defaults
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={'App'}>
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
    </div>
  )
}
