import React, { useEffect, useState } from 'react'
import './GameLose.css'
import Heading from '../../ui-kit/heading/Heading'
import EnergyStamina from '../../components/energy-stamina/EnergyStamina'
import PrimaryButton from '../../ui-kit/primary-button/PrimaryButton'
import { BeaverService } from '../../api/sporty/beaver/beaver.service'
import { useNavigate } from 'react-router-dom'
import { Howl } from 'howler'

const GameLose = () => {
    const beaverService = new BeaverService()
    const activeBeaver = beaverService.getActiveBeaverFromLocalStorage()

    const navigate = useNavigate()

    const [active, setActive] = useState<boolean>(false)

    useEffect(() => {
        const loseSound = new Howl({
            src: ['../audio/lose-sound.mp3']
        })
        setActive(true)
        loseSound.play()
    }, [])

    const beaverClassName = active ? 'game-lose__beaver game-lose__beaver_active' : 'game-lose__beaver'
    const countClassName = active ? 'game-lose__count game-lose__count_active' : 'game-lose__count'

    const nav2main = (): void => {
        navigate('/main')
    }
    
    return (
        <div className={'game-lose'}>
            <div className={'game-lose__background-gradient'}></div>

            <Heading text={'You lost!'} />
            <div className={ beaverClassName }>
                <img src={'../images/GameLoseBeaver.png'} alt={'beaver'} />
            </div>

            <div className={ countClassName }>
                <span className={'font-secondary'}>
                    Get lucky,<br />next time!
                </span>
            </div>

            <div className={'game-lose__buttons'}>
                <EnergyStamina  changed={true} initialEnergyPercent={
                    activeBeaver.energy / activeBeaver.max_energy * 100
                }/>
                <PrimaryButton label={'To menu'} onClick={ nav2main } />
            </div>
        </div>
    )
}

export default GameLose