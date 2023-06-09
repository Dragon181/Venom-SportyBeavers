import React, { FC } from 'react'
import './ProfileBalance.css'

export interface IProfileBalance {
    readonly beav: number
}

const ProfileBalance: FC<IProfileBalance> = ({ beav }) => {
    return (
        <div className={'profile-balance font-secondary'}>
            <p className={'profile-balance__title'}>$BEAV balance</p>
            <p className={'profile-balance__beav'}>
                <span>{ beav }</span> beav
            </p>
            <div className={'profile-balance__background'}></div>
        </div>
    )
}

export default ProfileBalance