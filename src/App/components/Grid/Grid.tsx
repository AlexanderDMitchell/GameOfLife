import './Grid.css'

import React from 'react'

import { ColorContext, HexOpacity } from '../../context/ColorProvider'
import { CellCoordinates, GridData } from '../../types'
import { Cell } from '../Cell/Cell'

interface Props {
  grid: GridData
  toggleCellFill: (coordinate: CellCoordinates) => void
  cellSize: number
  showGrid: boolean
}

export const Grid = ({ grid, toggleCellFill, cellSize, showGrid }: Props) => {
  const { color } = React.useContext(ColorContext)
  const borderColor = showGrid ? `${color}${HexOpacity['20']}` : 'transparent'

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
                borderColor={borderColor}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
