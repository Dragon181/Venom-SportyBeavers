import React, { FC } from 'react'
import { IOnboardingSlide } from '../../api/sporty/onboarding/interfaces/onboarding-slide.interface'

export interface IOnboardingSlideComponent {
    readonly slide: IOnboardingSlide
    readonly active: boolean
}

const OnboardingSlide: FC<IOnboardingSlideComponent> = ({ slide, active}) => {
    return (
        <div style={{
            height: '100%',
            display: active ? 'block' : 'none'
        }}>
            <img src={slide.slide_content} alt={slide.slide_id} style={{
                height: '100%',
            }} />
        </div>
    )
}

export default OnboardingSlide