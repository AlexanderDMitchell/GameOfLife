import './App.css'

import { Grid } from './components/Grid/Grid'
import { Navbar } from './components/Navbar/Navbar'
import { useGameOfLife } from './useGameOfLife'

export function App() {
  const { state, toggleIsPlaying, createFullScreenGrid, toggleCellFill } =
    useGameOfLife()

  return (
    <div className={'App'}>
      <Navbar
        isPlaying={state.isPlaying}
        toggleIsPlaying={toggleIsPlaying}
        clearGrid={() => createFullScreenGrid({})}
        randomiseGrid={() => createFullScreenGrid({ randomise: true })}
      />
      <Grid grid={state.grid} toggleCellFill={toggleCellFill} />
    </div>
  )
}
