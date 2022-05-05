import './Cell.css'

interface Props {
  isFilled: boolean
  toggleFill: () => void
  size: number
}

export const Cell = ({ isFilled, toggleFill, size }: Props) => {
  const className = `cell ${isFilled ? 'cell_filled' : ''}`

  return (
    <div
      className={className}
      onClick={toggleFill}
      style={{ width: size, height: size }}
    />
  )
}
