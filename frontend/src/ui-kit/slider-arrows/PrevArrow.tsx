import React, { FC } from 'react'
import { ISliderArrow } from './arrow.interface'

const PrevArrow: FC<ISliderArrow> = ({ onClick }) => {
    return (
        <div className={'prev-arrow'} style={{
            cursor: 'pointer',
            zIndex: 10
        }} onClick={onClick}>
            <svg width="13" height="28" viewBox="0 0 13 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5299e-06 10.5L13 0L13 6.32075L3.97209 13.695L13 21.6791L13 28L9.94434e-07 16.625L1.5299e-06 10.5Z" fill="white"/>
            </svg>
        </div>
    )
}

export default PrevArrow