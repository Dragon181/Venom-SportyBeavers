import React from 'react'
import { Modal } from '../modal/Modal'
import Heading from '../../ui-kit/heading/Heading'
import PrimaryButton from '../../ui-kit/primary-button/PrimaryButton'
import SecondaryButton from '../../ui-kit/secondary-button/SecondaryButton'
import SecondaryText from '../../ui-kit/secondary-text/SecondaryText'
import { useNavigate } from 'react-router-dom'

const ErrorModal = () => {
    const navigate = useNavigate()

    const reloadPage = (): void => {
        navigate('/')
        window.location.reload()
    }

    const writeSupport = (): void => {
        window.open(`mailto:support@sportybeavers.com`)
    }

    return (
        <Modal id={'error-modal'}>
            <img src={'../images/ErrorModalImage.png'} alt={'error'} />
            <Heading text={'Error :('} />
            <SecondaryText text={'Reboot the app or contact our support team'} />
            <PrimaryButton label={'Reboot the app'} onClick={ reloadPage } />
            <SecondaryButton label={'Contact support'} onClick={ writeSupport } />
        </Modal>
    )
}

export default ErrorModal