import React, { FC } from 'react'
import './OptionButton.css'

export interface IOptionButton {
    readonly onClick: () => void
}

const OptionButton: FC<IOptionButton> = ({ onClick }) => {
    return (
        <button className={'option-button'} onClick={ onClick }></button>
    )
}

export default OptionButton