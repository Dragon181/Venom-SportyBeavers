import React, { FC } from 'react'
import './DisabledButton.css'

export interface IDisabledButton {
    readonly text: string
}

const DisabledButton: FC<IDisabledButton> = ({ text }) => {
    return (
        <button disabled className={'disabled-button font-secondary'}>
            { text }
        </button>
    )
}

export default DisabledButton