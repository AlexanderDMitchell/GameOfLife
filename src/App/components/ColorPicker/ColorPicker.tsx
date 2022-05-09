import React from 'react'
import { HexColorPicker } from 'react-colorful'
import { useDebouncedCallback } from 'use-debounce'

import { ColorContext } from '../../context/ColorProvider'

export const ColorPicker = () => {
  const { color, setColor } = React.useContext(ColorContext)

  const [value, setValue] = React.useState(color)

  const setColorDebounced = useDebouncedCallback((newValue: string) => {
    setColor(newValue)
  }, 250)

  return (
    <HexColorPicker
      color={value}
      onChange={(newValue) => {
        setValue(newValue)
        setColorDebounced(newValue)
      }}
    />
  )
}
