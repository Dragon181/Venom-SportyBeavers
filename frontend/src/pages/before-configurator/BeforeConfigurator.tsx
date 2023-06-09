import React, { useEffect } from 'react'
import './BeforeConfigurator.css'
import BackgroundGradient from '../../ui-kit/background-gradient/BackgroundGradient'
import PrimaryButton from '../../ui-kit/primary-button/PrimaryButton'
import { useNavigate } from 'react-router-dom'
import Heading from '../../ui-kit/heading/Heading'
import BackButton from '../../ui-kit/back-button/BackButton'
import { Howl } from 'howler'

const BeforeConfigurator = () => {
    const navigate = useNavigate()

    const nav2Config = (): void => {
        navigate('/config')
    }

    useEffect(() => {
        const startupSound = new Howl({
            src: ['../audio/startup-sound.mp3']
        })
        startupSound.play()

        setTimeout(() => {
            const hiddenImages = document.querySelector('.before-configurator__images_hidden')
            if (hiddenImages) {
                hiddenImages.classList.remove('before-configurator__images_hidden')
            }
        }, 500)
    }, [])

    return (
        <div className={'before-configurator'}>
            <BackButton />

            <BackgroundGradient />

            <img className={'before-configurator__beaver'} src={'./images/BeforeConfiguratorBeaver.png'} alt={'beaver'} />

            <div className={'before-configurator__images before-configurator__images_hidden'}>
                <div className={'before-configurator__images-body'}>
                    <img className={'before-configurator__shoes'} src={'./images/BeforeConfiguratorShoes.png'} alt={'image1'} />
                    <img className={'before-configurator__butterfly'} src={'./images/BeforeConfiguratorButterfly.png'} alt={'image2'} />
                    <img className={'before-configurator__sunglasses'} src={'./images/BeforeConfiguratorSunGlasses.png'} alt={'image3'} />
                    <img className={'before-configurator__banana'} src={'./images/BeforeConfiguratorBanana.png'} alt={'image4'} />
                    <img className={'before-configurator__glasses'} src={'./images/BeforeConfiguratorGlasses.png'} alt={'image5'} />
                    <img className={'before-configurator__lollipop'} src={'./images/BeforeConfiguratorLollipop.png'} alt={'image6'} />
                </div>
            </div>

            <Heading text={'You have to create a beaver'} />
            <PrimaryButton label={'Go to configurator'} onClick={ nav2Config } />
        </div>
    )
}

export default BeforeConfigurator