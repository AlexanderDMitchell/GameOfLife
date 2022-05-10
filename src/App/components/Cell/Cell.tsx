import './Cell.css'

import React from 'react'

import { ColorContext } from '../../context/ColorProvider'

interface Props {
  isFilled: boolean
  toggleFill: () => void
  size: number
  borderColor: string
}

export const Cell = ({ isFilled, toggleFill, size, borderColor }: Props) => {
  const { color } = React.useContext(ColorContext)

  const className = `cell ${isFilled ? 'cell_filled' : ''}`

  return (
    <div
      className={className}
      onClick={toggleFill}
      style={{
        width: size,
        height: size,
        backgroundColor: isFilled ? color : 'transparent',
        borderColor
      }}
    />
  )
}
