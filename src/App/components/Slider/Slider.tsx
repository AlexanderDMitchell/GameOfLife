import './Slider.css'

import React from 'react'
import { useDebouncedCallback } from 'use-debounce'

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

  return (
    <div className={'slider_container'}>
      <p className={'slider_label'}>{label}</p>
      <input
        className={'slider'}
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
