import React, { useEffect, useState } from 'react'
import './GameDraw.css'
import Heading from '../../ui-kit/heading/Heading'
import EnergyStamina from '../../components/energy-stamina/EnergyStamina'
import PrimaryButton from '../../ui-kit/primary-button/PrimaryButton'
import { BeaverService } from '../../api/sporty/beaver/beaver.service'
import { useNavigate } from 'react-router-dom'
import { Howl } from 'howler'

const GameDraw = () => {
    const beaverService = new BeaverService()
    const activeBeaver = beaverService.getActiveBeaverFromLocalStorage()

    const navigate = useNavigate()

    const [active, setActive] = useState<boolean>(false)

    useEffect(() => {
        const drawSound = new Howl({
            src: ['../audio/joke-drums.wav']
        })
        setActive(true)
        drawSound.play()
    }, [])

    const beaverClassName = active ? 'game-draw__beaver game-draw__beaver_active' : 'game-draw__beaver'
    const countClassName = active ? 'game-draw__count game-draw__count_active' : 'game-draw__count'

    const nav2main = (): void => {
        navigate('/main')
    }
    
    return (
        <div className={'game-draw'}>
            <div className={'game-draw__background-gradient'}></div>

            <Heading text={'Tie'} />
            <div className={ beaverClassName }>
                <img src={'../images/GameLoseBeaver.png'} alt={'beaver'} />
            </div>

            <div className={ countClassName }>
                <Heading text={'The battle was even!'} />
                <span className={'font-secondary'}>
                    You haven't lost or earn anything
                </span>
            </div>

            <div className={'game-draw__buttons'}>
                <EnergyStamina changed={false} initialEnergyPercent={
                    activeBeaver.energy / activeBeaver.max_energy * 100
                }/>
                <PrimaryButton label={'To menu'} onClick={ nav2main } />
            </div>
        </div>
    )
}

export default GameDraw