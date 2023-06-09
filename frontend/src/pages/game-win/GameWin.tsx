import React, { useEffect, useState } from 'react'
import { Howl } from 'howler'
import './GameWin.css'
import Heading from '../../ui-kit/heading/Heading'
import PrimaryButton from '../../ui-kit/primary-button/PrimaryButton'
import { useNavigate } from 'react-router-dom'
import EnergyStamina from '../../components/energy-stamina/EnergyStamina'
import { BeaverService } from '../../api/sporty/beaver/beaver.service'

const GameWin = () => {
    const beaverService = new BeaverService()
    const activeBeaver = beaverService.getActiveBeaverFromLocalStorage()
    const gain = beaverService.getWinGain(activeBeaver.level)

    const navigate = useNavigate()
    
    const [active, setActive] = useState<boolean>(false)

    useEffect(() => {
        const winSound = new Howl({
            src: ['../audio/success-fanfare.mp3']
        })
        setActive(true)
        winSound.play()
    }, [])

    const medalClassName = active ? 'game-win__medal game-win__medal_active' : 'game-win__medal'
    const countClassName = active ? 'game-win__count game-win__count_active' : 'game-win__count'

    const nav2main = (): void => {
        navigate('/main')
    }
    
    return (
        <div className={'game-win'}>
            <div className={'game-win__background-gradient'}></div>

            <Heading text={'You win!'} />
            <div className={ medalClassName }>
                <img src={'../images/GameWinMedal.png'} alt={'medal'} />
            </div>

            <div className={ countClassName }>
                <span className={'font-secondary'}>Earned</span>
                <Heading text={'+' + gain + ' $BEAV'} />
            </div>
            
            <div className={'game-win__buttons'}>
                <EnergyStamina changed={true} initialEnergyPercent={
                    activeBeaver.energy / activeBeaver.max_energy * 100
                }/>
                <PrimaryButton label={'To menu'} onClick={ nav2main } />
            </div>
        </div>
    )
}

export default GameWin