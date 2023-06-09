import React, { FC } from 'react'
import './BeaverDetailPoints.css'

export interface IBeaverDetailPoints {
    readonly strength: number
    readonly agility: number
    readonly endurance: number
    readonly will: number
}

const BeaverDetailPoints: FC<IBeaverDetailPoints> = (
    {
        strength,
        agility,
        endurance,
        will,
    }
) => {
    return (
        <div className={'beaver-detail__points font-secondary'}>
            <div className={'beaver-detail__points-item'}>
                <p>Strength</p>
                <span>{ strength }</span>
            </div>
            <div className={'beaver-detail__points-item'}>
                <p>Agility</p>
                <span>{ agility }</span>
            </div>
            <div className={'beaver-detail__points-item'}>
                <p>Endurance</p>
                <span>{ endurance }</span>
            </div>
            <div className={'beaver-detail__points-item'}>
                <p>Moral</p>
                <span>{ will }</span>
            </div>
        </div>
    )
}

export default BeaverDetailPoints