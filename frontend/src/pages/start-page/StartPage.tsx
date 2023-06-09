import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import './StartPage.css'

import Heading from '../../ui-kit/heading/Heading'
import PrimaryButton from '../../ui-kit/primary-button/PrimaryButton'
import { UserService } from '../../api/sporty/user/user.service'
import { Howl } from 'howler'

const StartPage = () => {
    const userService = new UserService()
    const navigate = useNavigate()

    useEffect(() => {
        const welcomeSound = new Howl({ src: ['../audio/interface-welcome.mp3'] })
        welcomeSound.play()
    }, [])

    const logInAction = async (): Promise<void> => {
        const initConnect = await userService.initVenomConnect()

        const auth = await initConnect.checkAuth()

        if (auth && auth.isInitialized) {
            const provider = await initConnect.connect()
            const providerState = await provider?.getProviderState?.()
            const address = providerState?.permissions.accountInteraction?.address.toString()

            initConnect.on('connect', async () => {
                const user = await userService.findByWallet(address)
                if (user.beavers.length) {
                    navigate('/main')
                } else {
                    navigate('/before-config')
                }
            })
        }
    }

    return (
        <div className={'start-page'}>
            <img className={'start-page__background'} src={'./images/Gradient.png'} alt={''} />

            <img className={'start-page__logo'} src={'./images/StartScreenLogo.png'} alt={'Logo'} />
            <div className={'start-page__text'}>
                <Heading text={'Welcome to the Sporty Beavers!'} />
            </div>
            <div className={'start-page__buttons'}>
                <PrimaryButton label={'Start'} onClick={ logInAction } />
            </div>
        </div>
    )
}

export default StartPage