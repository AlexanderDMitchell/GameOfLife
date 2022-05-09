import React from 'react'

const context = {
  color: '#6b7502',
  setColor: (value: string) => undefined
}

export const ColorContext = React.createContext(context)

export const ColorProvider = ({ children }: { children: React.ReactNode }) => {
  const [color, setColor] = React.useState('#6b7502')
  return (
    <ColorContext.Provider
      value={{
        color,
        setColor: (value) => {
          setColor(value)
          return undefined
        }
      }}>
      {children}
    </ColorContext.Provider>
  )
}
