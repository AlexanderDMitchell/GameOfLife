import './Icons.css'

import React from 'react'

import { ColorContext } from '../../context/ColorProvider'

export const BurgerIcon = () => {
  const { secondaryColor } = React.useContext(ColorContext)
  const isDark = secondaryColor === '#000000'
  const burgerBarClass = `burger_bar ${isDark ? '' : 'burger_bar_light'}`

  return (
    <div className={'burger'}>
      <div className={burgerBarClass} />
      <div className={burgerBarClass} />
      <div className={burgerBarClass} />
    </div>
  )
}

export const CloseIcon = () => {
  const { secondaryColor } = React.useContext(ColorContext)
  const isDark = secondaryColor === '#000000'

  return <div className={`${isDark ? 'cross' : 'cross_light'}`} />
}

export const VerticalEllipsisIcon = () => {
  const { secondaryColor } = React.useContext(ColorContext)
  const isDark = secondaryColor === '#000000'
  const settingsIconBlockClass = `settings_icon_block ${
    isDark ? '' : 'settings_icon_block_light'
  }`

  return (
    <div className={'settings_icon'}>
      <div className={settingsIconBlockClass} />
      <div className={settingsIconBlockClass} />
      <div className={settingsIconBlockClass} />
    </div>
  )
}
