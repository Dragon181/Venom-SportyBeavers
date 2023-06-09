import React, { FC } from 'react'
import './Opponents.css'

export interface IOpponents {
    readonly userImageSrc: string
    readonly oppImageSrc: string
}

const Opponents: FC<IOpponents> = (ops) => {
    return (
        <div className={'opponents'}>
            <div className={'opponents__gradient'}></div>

            <div className={'opponents__item opponents__item-user'}>
                <img src={ ops.userImageSrc } alt={'userImageSrc'} />
            </div>


            <div className={'opponents__item opponents__item-opp'}>
                <img src={ ops.oppImageSrc } alt={'oppImageSrc'} />
            </div>
        </div>
    )
}

export default Opponents