import React, { FC } from 'react'
import './UnderlineHeading.css'
import { useNavigate } from 'react-router-dom'
import { clickSound } from '../audio/button-audio.const'

export interface IUnderlineHeading {
    readonly text: string
    readonly link?: {
        readonly title: string
        readonly src: string
    }
}

const UnderlineHeading: FC<IUnderlineHeading> = ({ text, link  }) => {
    const navigate = useNavigate()
    const nav2link = (): void => {
        clickSound.play()
        if (typeof link !== 'undefined') {
            navigate(link.src)
        }
    }

    return (
        <div className={'underline-heading font-secondary'}>
            { text }
            {
                typeof link !== 'undefined' ?
                    <button onClick={ nav2link }>
                        { link.title }
                    </button> : null
            }
            <div className={'underline-heading__border'}></div>
        </div>
    )
}

export default UnderlineHeading