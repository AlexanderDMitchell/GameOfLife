import './Slider.css'

import React from 'react'
import { useDebouncedCallback } from 'use-debounce'

import { ColorContext } from '../../context/ColorProvider'

interface Props {
  label: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}

export const Slider = ({
  label,
  value: initialValue,
  onChange,
  min = 1,
  max = 100
}: Props) => {
  const [value, setValue] = React.useState(initialValue)

  const onChangeDebounced = useDebouncedCallback((newValue: number) => {
    onChange(newValue)
  }, 250)

  const { color, secondaryColor } = React.useContext(ColorContext)

  const isLightMode = secondaryColor === '#ffffff'

  return (
    <div className={'slider_container'}>
      <p className={'slider_label'} style={{ color }}>
        {label}
      </p>
      <input
        className={`slider ${isLightMode ? 'slider_light' : ''}`}
        style={{ background: color }}
        type={'range'}
        value={value}
        min={min}
        max={max}
        onChange={(e) => {
          const newValue = parseInt(e.target.value)
          setValue(newValue)
          onChangeDebounced(newValue)
        }}
      />
    </div>
  )
}
