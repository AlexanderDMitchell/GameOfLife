import React from 'react'

import { GridData } from '../../types'
import { Grid } from '../Grid/Grid'

export const Spinner = () => {
  const initialGrid: GridData = [
    [0, 1, 1],
    [1, 0, 1],
    [1, 1, 1]
  ]

  const [grid, setGrid] = React.useState(initialGrid)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setGrid((current) => spin(current))
    }, 128)

    return () => clearInterval(interval)
  })

  return (
    <div className={'spinner_container'}>
      <Grid grid={grid} cellSize={20} showGrid={false} />
    </div>
  )
}

const spin = (inputGrid: GridData) => {
  const grid = cloneGrid(inputGrid)

  const rows = grid.length
  const columns = grid[0].length

  const centerRow = Math.floor(rows / 2)
  const centerCol = Math.floor(columns / 2)

  const lastRow = rows - 1
  const lastCol = columns - 1

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      if (grid[row][col]) {
        continue
      }

      const isCenter = row === centerRow && col === centerCol
      if (isCenter) {
        continue
      }

      grid[row][col] = 1

      // MOVE RIGHT
      if (row === 0 && col !== lastCol) {
        grid[row][col + 1] = 0
        return grid
      }

      // MOVE DOWN
      if (col === lastCol && row !== lastRow) {
        grid[row + 1][col] = 0
        return grid
      }

      // MOVE lEFT
      if (row === lastRow && col !== 0) {
        grid[row][col - 1] = 0
        return grid
      }

      // MOVE UP
      if (col === 0 && row !== 0) {
        grid[row - 1][col] = 0
        return grid
      }
    }
  }

  return grid
}

const cloneGrid = (grid: GridData) => {
  return grid.map((row) => {
    return row.slice()
  })
}
