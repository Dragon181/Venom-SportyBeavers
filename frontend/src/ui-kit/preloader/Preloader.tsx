import React from 'react'
import './Preloader.css'

export const openPreloader = (): void => {
    const preloader = document.getElementById('preloader')
    if (preloader) preloader.classList.add('preloader_active')
}

export const closePreloader = (): void => {
    const preloader = document.getElementById('preloader')
    if (preloader) preloader.classList.remove('preloader_active')
}

export const preloaderIsActive = (): boolean => {
    const preloader = document.getElementById('preloader')
    return preloader ? preloader.classList.contains('preloader_active') : false
}

const Preloader = () => {
    return (
        <div id={'preloader'} className={'preloader'}>
            <div className={'preloader-body'}>
                <div className={'preloader-spinner'}></div>
            </div>
        </div>
    )
}

export default Preloader