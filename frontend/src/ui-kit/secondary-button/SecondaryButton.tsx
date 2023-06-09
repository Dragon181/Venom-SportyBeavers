import React from 'react'
import './SecondaryButton.css'
import { ISecondaryButton } from './secondary-button.interface'
import { clickSound } from '../audio/button-audio.const'

const SecondaryButton = (btn: ISecondaryButton) => {
    const clickHandler = (): void => {
        btn.onClick()
    }

    return (
        <button onClick={ clickHandler } onMouseDown={ () => { clickSound.play() } }
             className={'secondary-button font-secondary'}>
            { btn.label }
        </button>
    )
}

export default SecondaryButton