import React from 'react'
import './PrimaryButton.css'
import { clickSound } from '../audio/button-audio.const'

export interface IPrimaryButton {
    readonly label: string
    readonly onClick: () => void
    readonly cost?: string
    readonly disabled?: boolean
}

const PrimaryButton = (btn: IPrimaryButton) => {
    const disabledClass = btn.disabled ? 'primary-button_disabled' : ''

    const clickHandler = (): void => {
        btn.onClick()
    }

    return (
        <button onClick={ clickHandler } onMouseDown={ () => { clickSound.play() } } disabled={btn.disabled}
             className={'primary-button font-secondary ' + disabledClass}>
            { btn.label }
            {
                btn.hasOwnProperty('cost') ?
                    <div className={'primary-button__cost'}>
                        <span>{ btn.cost }</span>
                    </div> : null
            }
        </button>
    )
}

export default PrimaryButton