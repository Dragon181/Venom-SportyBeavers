import React from 'react'
import './WillModal.css'
import { closeModal, Modal } from '../modal/Modal'
import Heading from '../../ui-kit/heading/Heading'
import SecondaryText from '../../ui-kit/secondary-text/SecondaryText'
import PrimaryButton from '../../ui-kit/primary-button/PrimaryButton'

const WillModal = () => {
    return (
        <Modal id={'will-modal'}>
            <div className={'will-modal__note'}>
                <p className={'font-primary'}>+1</p>
                <p className={'font-secondary'}>
                    every<br />day
                </p>
            </div>

            <img src={'../images/WillModal.png'} alt={'WillModal'} />
            <Heading text={'Moral'} />
            <SecondaryText text={'Every day of logging into the game adds 1 unit to Moral. If you do not log in at least one day, the index is reset to the basic values. Used as a decisive indicator in Battle.'} />
            <PrimaryButton label={'Okay, it’s clear'} onClick={ closeModal } />
        </Modal>
    )
}

export default WillModal