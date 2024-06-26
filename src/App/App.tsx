import './App.css'

import React from 'react'

import { Checkbox } from './components/Checkbox/Checkbox'
import { ColorPicker } from './components/ColorPicker/ColorPicker'
import { Grid } from './components/Grid/Grid'
import { VerticalEllipsisIcon } from './components/Icons/Icons'
import { Navbar } from './components/Navbar/Navbar'
import { Slider } from './components/Slider/Slider'
import { Spinner } from './components/Spinner/Spinner'
import {
  ColorContext,
  ColorProvider,
  HexOpacity
} from './context/ColorProvider'
import { useGameOfLife } from './useGameOfLife'
import { updateFavicon, updateMetaThemeColor } from './utils'

export function App() {
  return (
    <ColorProvider>
      <AppContent />
    </ColorProvider>
  )
}

function AppContent() {
  const { state, dispatch, toggleIsPlaying, toggleCellFill, reset } =
    useGameOfLife()

  const { color, setColor, secondaryColor, setSecondaryColor } =
    React.useContext(ColorContext)

  React.useEffect(() => {
    updateFavicon(color)
    updateMetaThemeColor(color)
  }, [color])

  const buttonStyle = {
    backgroundColor: color,
    borderColor: color,
    color: `${secondaryColor}${HexOpacity['80']}`
  }

  const outlineButtonStyle = {
    color,
    borderColor: color
  }

  const isDark = secondaryColor === '#000000'

  if (state.showSpinner) {
    return (
      <div className={'App'} style={{ backgroundColor: secondaryColor }}>
        <div
          className={'App'}
          style={{
            backgroundColor: `${color}${HexOpacity['20']}`,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <Spinner />
          <p style={{ marginTop: '32px' }}>loading...</p>
        </div>
      </div>
    )
  }

  if (state.screen === 'settings') {
    return (
      <div className={'App'} style={{ backgroundColor: secondaryColor }}>
        <div
          className={'App'}
          style={{ backgroundColor: `${color}${HexOpacity['20']}` }}>
          <Navbar>
            {(hideDrawer) => (
              <>
                <button
                  className={'button button_large'}
                  style={buttonStyle}
                  onClick={() => {
                    setColor('#6b7502')
                    setSecondaryColor('#000000')
                    dispatch({ type: 'restore-default-settings' })
                    hideDrawer()
                  }}>
                  Restore defaults
                </button>
                <button
                  className={'button button_large'}
                  style={buttonStyle}
                  onClick={() => {
                    dispatch({ type: 'navigate', screen: 'game' })
                    hideDrawer()
                  }}>
                  Back
                </button>
              </>
            )}
          </Navbar>
          <div className={'settings'}>
            <div className={'settings_item'}>
              <Slider
                label={'Speed'}
                value={-state.generationDuration}
                onChange={(value) => {
                  dispatch({
                    type: 'update-generation-duration',
                    value: -value
                  })
                }}
                min={-2000}
                max={-32}
              />
            </div>

            <div className={'settings_item'}>
              <Slider
                label={'Cell size'}
                value={state.cellSize}
                onChange={(value) => {
                  dispatch({ type: 'update-cell-size', value })
                }}
                min={5}
                max={50}
              />
            </div>

            <div className={'settings_item'}>
              <ColorPicker />
            </div>

            <div className={'settings_item'}>
              <button
                className={`button no_margin ${
                  !isDark ? 'button_outline' : ''
                }`}
                style={!isDark ? outlineButtonStyle : buttonStyle}
                onClick={() => setSecondaryColor('#000000')}>
                Dark
              </button>
              <button
                className={`button no_margin ${isDark ? 'button_outline' : ''}`}
                style={isDark ? outlineButtonStyle : buttonStyle}
                onClick={() => setSecondaryColor('#ffffff')}>
                Light
              </button>
            </div>

            <div className={'settings_item'}>
              <Checkbox
                label={'Show grid'}
                checked={state.showGrid}
                onChange={() => dispatch({ type: 'toggle-grid' })}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={'App'} style={{ backgroundColor: secondaryColor }}>
      <div
        className={'App'}
        style={{ backgroundColor: `${color}${HexOpacity['20']}` }}>
        <Navbar>
          {(hideDrawer) => (
            <>
              <a
                className={'navbar_link'}
                style={{ color }}
                href={`https://en.wikipedia.org/wiki/Conway's_Game_of_Life`}
                target={'_blank'}
                rel={'noreferrer'}>
                Info
              </a>

              <button
                className={`button ${state.isPlaying ? 'button_outline' : ''}`}
                style={state.isPlaying ? outlineButtonStyle : buttonStyle}
                onClick={() => {
                  toggleIsPlaying()
                  hideDrawer()
                }}>
                {state.isPlaying ? 'Stop' : 'Start'}
              </button>

              <button
                className={'button'}
                style={buttonStyle}
                onClick={() => {
                  reset(true)
                  hideDrawer()
                }}>
                Randomise
              </button>

              <button
                className={'button'}
                style={buttonStyle}
                onClick={() => {
                  reset(false)
                  hideDrawer()
                }}>
                Clear
              </button>

              <button
                className={'button settings_button'}
                style={buttonStyle}
                onClick={() => {
                  dispatch({ type: 'navigate', screen: 'settings' })
                  hideDrawer()
                }}>
                <VerticalEllipsisIcon />
              </button>
            </>
          )}
        </Navbar>
        <div className={'grid_container'}>
          <Grid
            grid={state.grid}
            toggleCellFill={toggleCellFill}
            cellSize={state.cellSize}
            showGrid={state.showGrid}
          />
        </div>
      </div>
    </div>
  )
}
