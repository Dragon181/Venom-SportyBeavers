import { IOnboardingSlide } from './onboarding-slide.interface'

export interface IOnboarding {
    readonly onboarding_id: string
    readonly slides: IOnboardingSlide[]
}