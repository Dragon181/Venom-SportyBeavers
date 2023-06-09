import React from 'react'
import './SecondaryText.css'
import { ISecondaryText } from './secondary-text.interface'

const SecondaryText = (text: ISecondaryText) => {
    return (
        <p className={'secondary-text font-secondary'}>
            { text.text }
        </p>
    )
}

export default SecondaryText