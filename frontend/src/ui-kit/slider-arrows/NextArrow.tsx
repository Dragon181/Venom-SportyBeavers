import React, { FC } from 'react'
import { ISliderArrow } from './arrow.interface'

const NextArrow: FC<ISliderArrow> = ({ onClick }) => {
    return (
        <div className={'next-arrow'} style={{
            cursor: 'pointer',
            zIndex: 10
        }} onClick={onClick}>
            <svg width="13" height="28" viewBox="0 0 13 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 17.5L0 28V21.6792L9.02791 14.305L0 6.32092V0L13 11.375V17.5Z" fill="white"/>
            </svg>
        </div>
    )
}

export default NextArrow