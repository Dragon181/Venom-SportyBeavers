import React, { useEffect } from 'react'
import './AfterConfigurator.css'
import Heading from '../../ui-kit/heading/Heading'
import PrimaryButton from '../../ui-kit/primary-button/PrimaryButton'
import { useNavigate } from 'react-router-dom'
import BeaverItem from '../../components/beaver-item/BeaverItem'
import { BeaverService } from '../../api/sporty/beaver/beaver.service'
import { Howl } from 'howler'
import { OnboardingService } from '../../api/sporty/onboarding/onboarding.service'

const AfterConfigurator = () => {
    const beaverService = new BeaverService()
    const activeBeaver = beaverService.getActiveBeaverFromLocalStorage()

    const navigate = useNavigate()
    const nav2main = (): void => {
        navigate('/main')
    }

    useEffect(() => {
        const winSound = new Howl({
            src: ['../audio/success-fanfare.mp3']
        })
        winSound.play()
    }, [])

    return (
        <div className={'after-configurator'}>
            <div className={'after-configurator__background-gradient'}></div>
            <div className={'after-configurator__background-gradient'}></div>

            <Heading text={'Congratulations! This is your new Beaver'} />
            <div className={'after-configurator__beaver'}>
                <BeaverItem active={true} beaver={activeBeaver} />
            </div>
            <div className={'after-configurator__buttons'}>
                <PrimaryButton label={'Save'} onClick={nav2main} />
            </div>
        </div>
    )
}

export default AfterConfigurator