import React from 'react'
import './BackButton.css'
import { useNavigate } from 'react-router-dom'
import { backSound } from '../audio/button-audio.const'

const BackButton = () => {
    const navigate = useNavigate()

    const nav2back = (): void => navigate(-1)

    return (
        <div className={'back-button font-secondary'} onClick={ nav2back } onMouseDown={() => backSound.play()}>
            Back
        </div>
    )
}

export default BackButton