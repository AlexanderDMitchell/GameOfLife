import './Checkbox.css'

import React from 'react'

import { ColorContext } from '../../context/ColorProvider'

interface Props {
  label: string
  checked: boolean
  onChange: () => void
}

export const Checkbox = ({ label, checked, onChange }: Props) => {
  const { color } = React.useContext(ColorContext)

  return (
    <div className={'checkbox_container'}>
      <button
        className={'checkbox'}
        style={{
          borderColor: color,
          backgroundColor: checked ? color : 'transparent'
        }}
        onClick={onChange}
      />
      <p className={'checkbox_label'} style={{ color }}>
        {label}
      </p>
    </div>
  )
}
