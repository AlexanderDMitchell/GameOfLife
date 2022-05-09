import { Action, State } from './useGameOfLife'

export type GridData = (0 | 1)[][]

export type CellCoordinates = [row: number, column: number]

export type ScreenProps = {
  state: State
  dispatch: React.Dispatch<Action>
  toggleIsPlaying: () => void
  createFullScreenGrid: ({
    cellSize,
    addGlider,
    randomise
  }: {
    cellSize: number
    addGlider?: boolean | undefined
    randomise?: boolean | undefined
  }) => GridData
  toggleCellFill: (coordinates: CellCoordinates) => void
}
