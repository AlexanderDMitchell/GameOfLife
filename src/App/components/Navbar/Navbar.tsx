import './Navbar.css'

import React from 'react'

import { ColorContext } from '../../context/ColorProvider'

interface Props {
  children: React.ReactNode
}

export const Navbar = ({ children }: Props) => {
  const { color } = React.useContext(ColorContext)

  return (
    <div className={'navbar'}>
      <h1 style={{ color }}>Game of Life</h1>
      <div className={'navbar_actions'}>{children}</div>
    </div>
  )
}
