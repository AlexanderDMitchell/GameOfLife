import './Settings.css'

import { ColorPicker } from '../../components/ColorPicker/ColorPicker'
import { Navbar } from '../../components/Navbar/Navbar'
import { Slider } from '../../components/Slider/Slider'
import { ScreenProps } from '../../types'

export function Settings({ state, dispatch }: ScreenProps) {
  return (
    <>
      <Navbar>
        <button
          className={'button'}
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
              dispatch({ type: 'update-generation-duration', value: -value })
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
            className={'button button_large'}
            onClick={() => {
              dispatch({ type: 'restore-default-settings' })
            }}>
            Restore defaults
          </button>
        </div>
      </div>
    </>
  )
}
