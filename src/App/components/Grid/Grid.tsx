import './Grid.css'

import React from 'react'

import { ColorContext } from '../../context/ColorProvider'
import { CellCoordinates, GridData } from '../../types'
import { Cell } from '../Cell/Cell'

interface Props {
  grid: GridData
  toggleCellFill: (coordinate: CellCoordinates) => void
  cellSize: number
}

export const Grid = ({ grid, toggleCellFill, cellSize }: Props) => {
  const { color: borderColor } = React.useContext(ColorContext)

  return (
    <div className={'grid_container'}>
      <div className={'grid'} style={{ borderColor }}>
        {grid.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className={'grid_row'}>
            {row.map((cell, columnIndex) => (
              <Cell
                key={`cell-${columnIndex}`}
                isFilled={!!cell}
                size={cellSize}
                toggleFill={() => toggleCellFill([rowIndex, columnIndex])}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
