import React from 'react'

type monochrome = '#000000' | '#ffffff'

type Context = {
  color: string
  secondaryColor: monochrome
  setColor: (_value: string) => void
  setSecondaryColor: (_value: monochrome) => void
}

const context: Context = {
  color: '#6b7502',
  secondaryColor: '#000000',
  setColor: (_value: string) => {
    //
  },
  setSecondaryColor: (_value: monochrome) => {
    //
  }
}

export const ColorContext = React.createContext<Context>(context)

export const ColorProvider = ({ children }: { children: React.ReactNode }) => {
  const [color, setColor] = React.useState('#6b7502')
  const [secondaryColor, setSecondaryColor] =
    React.useState<monochrome>('#000000')

  return (
    <ColorContext.Provider
      value={{
        color,
        secondaryColor,
        setColor: (value) => setColor(value),
        setSecondaryColor: (value) => setSecondaryColor(value)
      }}>
      {children}
    </ColorContext.Provider>
  )
}
