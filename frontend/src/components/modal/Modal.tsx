import React from 'react'
import './Modal.css'
import { IModal } from './modal.interface'
import { backSound } from '../../ui-kit/audio/button-audio.const'

const modalClass = 'modal'
const modalActiveClass = modalClass + '_active'

const ModalCloseButton = () => {
    return (
        <div className={'modal-close'} onClick={ closeModal } onMouseDown={() => backSound.play()}>
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.5">
                    <path fillRule="evenodd" clipRule="evenodd" d="M23.1407 21.7279L34.4544 10.4142L33.0402 9L21.7265 20.3137L10.6856 9.27276L9.2714 10.687L20.3123 21.7279L8.99854 33.0416L10.4127 34.4558L21.7265 23.1421L33.313 34.7286L34.7272 33.3144L23.1407 21.7279Z" fill="white"/>
                </g>
            </svg>
        </div>
    )
}

export const closeModal = () => {
    const modals = document.getElementsByClassName(modalClass)
    for (let i = 0; i < modals.length; i++) {
        modals[i].classList.remove(modalActiveClass)
    }
}

export const openModal = (id: string) => {
    const neededModal = document.getElementById(id)
    if (neededModal) {
        neededModal.classList.add(modalActiveClass)
    }
}

export const Modal = (modal: IModal) => {
    return (
        <div className={modalClass} id={modal.id}>
            <div className={'modal-body'}>
                <ModalCloseButton />
                { modal.children }
            </div>
        </div>
    )
}
