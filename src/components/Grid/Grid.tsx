import './Grid.css'

import { Cell } from '../Cell/Cell'

const grid = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

export const Grid = () => {
  return (
    <div className={'grid_container'}>
      <div className={'grid'}>
        {grid.map((row, index) => (
          <div key={`row-${index}`} className={'grid_row'}>
            {row.map((cell, cellIndex) => (
              <Cell key={`cell-${cellIndex}`} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
