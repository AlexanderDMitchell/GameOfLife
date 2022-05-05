import './App.css'

import { Grid } from './components/Grid/Grid'
import { Navbar } from './components/Navbar/Navbar'
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
          onClick={() => createFullScreenGrid({ randomise: true })}>
          Randomise
        </button>

        <button className={'button'} onClick={() => createFullScreenGrid({})}>
          Clear
        </button>

        <button
          className={'button settings_button'}
          onClick={() => dispatch({ type: 'navigate', screen: 'settings' })}>
          &#8942;
        </button>
      </Navbar>

      <Grid grid={state.grid} toggleCellFill={toggleCellFill} />
    </div>
  )
}
