import './Navbar.css'

import React from 'react'

import { ColorContext } from '../../context/ColorProvider'

interface Props {
  children: (hideDrawer: () => void) => React.ReactNode
}

export const Navbar = ({ children }: Props) => {
  const { color, secondaryColor } = React.useContext(ColorContext)

  const [showDrawer, setShowDrawer] = React.useState(false)
  const toggleDrawer = () => setShowDrawer((current) => !current)

  const hideDrawer = () => {
    if (showDrawer) {
      setShowDrawer(false)
    }
  }

  const buttonStyle = {
    backgroundColor: color,
    borderColor: color,
    color: `${secondaryColor}cc`
  }

  return (
    <div className={'navbar'}>
      <h1 style={{ color }}>Game of Life</h1>
      <div className={'navbar_actions'}>{children(hideDrawer)}</div>
      <button
        className={'button side_drawer_button'}
        style={buttonStyle}
        onClick={toggleDrawer}>
        <div className={'burger'}>
          <div className={'burger_bar'} />
          <div className={'burger_bar'} />
          <div className={'burger_bar'} />
        </div>
      </button>
      {showDrawer && (
        <>
          <button className={'backdrop'} onClick={toggleDrawer} />
          <div
            className={'side_drawer'}
            style={{ backgroundColor: secondaryColor }}>
            <div
              className={'side_drawer_content'}
              style={{
                backgroundColor: `${color}33`,
                borderColor: `${color}1a`
              }}>
              <button
                id={'close'}
                className={'button side_drawer_button'}
                style={buttonStyle}
                onClick={toggleDrawer}>
                <div className={'cross'} />
              </button>
              {children(hideDrawer)}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
