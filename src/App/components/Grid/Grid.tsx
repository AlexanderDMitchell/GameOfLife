import './Grid.css'

import { CellCoordinates, GridData } from '../../types'
import { Cell } from '../Cell/Cell'

interface Props {
  grid: GridData
  toggleCellFill: (coordinate: CellCoordinates) => void
}

export const Grid = ({ grid, toggleCellFill }: Props) => {
  return (
    <div className={'grid_container'}>
      <div className={'grid'}>
        {grid.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className={'grid_row'}>
            {row.map((cell, columnIndex) => (
              <Cell
                key={`cell-${columnIndex}`}
                isFilled={!!cell}
                toggleFill={() => toggleCellFill([rowIndex, columnIndex])}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
