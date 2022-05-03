import { GridData } from './types'

export const createGrid = (rows: number, columns: number) => {
  const grid: GridData = []

  for (let row = 0; row < rows; row++) {
    grid.push([])

    for (let col = 0; col < columns; col++) {
      grid[row].push(0)
    }
  }

  return grid
}

export const cloneGrid = (grid: GridData) => {
  return grid.map((row) => {
    return row.slice()
  })
}
