import './Cell.css'

interface Props {
  isFilled: boolean
  toggleFill: () => void
}

export const Cell = ({ isFilled, toggleFill }: Props) => {
  const className = `cell ${isFilled ? 'cell_filled' : ''}`

  return <div className={className} onClick={toggleFill} />
}
