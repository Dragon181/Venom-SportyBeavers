import React from 'react'
import { closeModal, Modal } from '../modal/Modal'
import Heading from '../../ui-kit/heading/Heading'
import SecondaryText from '../../ui-kit/secondary-text/SecondaryText'
import PrimaryButton from '../../ui-kit/primary-button/PrimaryButton'

const EnergyModal = () => {
    return (
        <Modal id={'energy-modal'}>
            <img src={'../images/FlashModal.png'} alt={'FlashModal'} />
            <Heading text={'Energy'} />
            <SecondaryText text={'This characteristic allows your beaver take part in the battles. You can get more with playing move games.'} />
            <PrimaryButton label={'Okay, it’s clear'} onClick={ closeModal } />
        </Modal>
    )
}

export default EnergyModal