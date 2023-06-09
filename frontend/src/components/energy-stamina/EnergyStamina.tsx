import React, { FC, useEffect, useState } from 'react'
import './EnergyStamina.css'
import { BeaverService } from '../../api/sporty/beaver/beaver.service'

export interface IEnergyStamina {
    readonly changed: boolean
    readonly initialEnergyPercent: number
}

const EnergyStamina: FC<IEnergyStamina> = ({ changed, initialEnergyPercent }) => {
    const [flashedLineWidth, setWidth] = useState<number>(initialEnergyPercent)

    useEffect(() => {
        const beaverService = new BeaverService()
        const activeBeaver = beaverService.getActiveBeaverFromLocalStorage()
        if (changed) {
            setWidth((activeBeaver.energy - 1) / activeBeaver.max_energy * 100)
        }
    }, [changed])

    const titleSpanText = changed ? 'Energy' : 'Energy stays the same'

    return (
        <div className={'energy-stamina'}>
            <div className={'energy-stamina__title'}>
                <span className={'font-secondary'}>{ titleSpanText }</span>
                <p className={'font-secondary'}>{ changed ? '-1' : null }</p>
            </div>
            <div className={'energy-stamina__line'}>
                <div className={'energy-stamina__line-flashed'}
                     style={{
                         width: flashedLineWidth + '%',
                         transition: 'width 300ms ease-in-out 700ms'
                     }}></div>
            </div>
        </div>
    )
}

export default EnergyStamina