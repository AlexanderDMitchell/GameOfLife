import './App.css'

import React from 'react'

import { Checkbox } from './components/Checkbox/Checkbox'
import { ColorPicker } from './components/ColorPicker/ColorPicker'
import { Grid } from './components/Grid/Grid'
import { Navbar } from './components/Navbar/Navbar'
import { Slider } from './components/Slider/Slider'
import { ColorContext, ColorProvider } from './context/ColorProvider'
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
  const {
    state,
    dispatch,
    toggleIsPlaying,
    createFullScreenGrid,
    toggleCellFill
  } = useGameOfLife()

  const { color, setColor, secondaryColor, setSecondaryColor } =
    React.useContext(ColorContext)

  React.useEffect(() => {
    updateFavicon(color)
    updateMetaThemeColor(color)
  }, [color])

  const buttonStyle = {
    backgroundColor: color,
    borderColor: color,
    color: `${secondaryColor}cc`
  }

  const outlineButtonStyle = {
    color,
    borderColor: color
  }

  const isDark = secondaryColor === '#000000'

  if (state.screen === 'settings') {
    return (
      <div className={'App'} style={{ backgroundColor: secondaryColor }}>
        <div className={'App'} style={{ backgroundColor: `${color}33` }}>
          <Navbar>
            <button
              className={'button button_large'}
              style={buttonStyle}
              onClick={() => {
                setColor('#6b7502')
                setSecondaryColor('#000000')
                dispatch({ type: 'restore-default-settings' })
              }}>
              Restore defaults
            </button>
            <button
              className={'button'}
              style={buttonStyle}
              onClick={() => dispatch({ type: 'navigate', screen: 'game' })}>
              Back
            </button>
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
                min={-3200}
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
      <div className={'App'} style={{ backgroundColor: `${color}33` }}>
        <Navbar>
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
            onClick={toggleIsPlaying}>
            {state.isPlaying ? 'Stop' : 'Start'}
          </button>

          <button
            className={'button'}
            style={buttonStyle}
            onClick={() => {
              const grid = createFullScreenGrid({
                cellSize: state.cellSize,
                randomise: true
              })
              dispatch({ type: 'set-grid', grid, keepPlaying: false })
            }}>
            Randomise
          </button>

          <button
            className={'button'}
            style={buttonStyle}
            onClick={() => {
              const grid = createFullScreenGrid({ cellSize: state.cellSize })
              dispatch({ type: 'set-grid', grid, keepPlaying: false })
            }}>
            Clear
          </button>

          <button
            className={'button settings_button'}
            style={buttonStyle}
            onClick={() => dispatch({ type: 'navigate', screen: 'settings' })}>
            &#8942;
          </button>
        </Navbar>

        <Grid
          grid={state.grid}
          toggleCellFill={toggleCellFill}
          cellSize={state.cellSize}
          showGrid={state.showGrid}
        />
      </div>
    </div>
  )
}
