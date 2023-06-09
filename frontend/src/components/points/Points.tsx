import React, { FC, useEffect, useState } from 'react'
import './Points.css'
import { openModal } from '../modal/Modal'
import { UserService } from '../../api/sporty/user/user.service'
import EnergyModal from '../energy-modal/EnergyModal'
import WillModal from '../will-modal/WillModal'

export interface IPointsState {
    readonly activeBeaverEnergy: number
    readonly maxActiveBeaverEnergy: number
    readonly userWill: number
}

export interface IPoints {
    readonly activeIndex: number
}

const Points: FC<IPoints> = ({ activeIndex }) => {
    const [state, setState] = useState<IPointsState>({
        activeBeaverEnergy: 0, maxActiveBeaverEnergy: 0, userWill: 0
    })

    useEffect(() => {
        const userService = new UserService()
        const user = userService.getFromLocalStorage()
        const activeBeaver = (user && user.beavers && user.beavers.length) ?
            user.beavers[activeIndex] : null

        setState({
            activeBeaverEnergy: activeBeaver ? activeBeaver.energy : 0,
            maxActiveBeaverEnergy: activeBeaver ? activeBeaver.max_energy : 0,
            userWill: user.moral,
        })
    }, [activeIndex])

    return (
        <div className={'properties'}>
            <div className={'properties-item'} onClick={ () => {
                openModal('energy-modal')
            } }>
                <img src={'../images/Flash.png'}  alt={'Flash'}/>
                <p className={'font-secondary'}>
                    Energy
                </p>
                <br />
                <span className={'font-secondary'}>
                    {state.activeBeaverEnergy}/{state.maxActiveBeaverEnergy}
                </span>
            </div>
            <div className={'properties-item'} onClick={ () => {
                openModal('will-modal')
            } }>
                <img src={'../images/Will.png'}  alt={'Will'}/>
                <p className={'font-secondary'}>
                    Moral
                </p>
                <br />
                <span className={'font-secondary'}>
                    {state.userWill}
                </span>
            </div>

            <EnergyModal />
            <WillModal />
        </div>
    )
}

export default Points