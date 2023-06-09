import { SportyApi } from '../sporty-api.service'
import { IOnboarding } from './interfaces/onboarding.interface'

export class OnboardingService {
    private readonly api = new SportyApi<IOnboarding>()
    private readonly viewedOnboardingsKey = 'SportyBeavers__viewed-onboardings'

    async getOnboarding(id: string): Promise<IOnboarding> {
        return this.api.request({
            method: 'GET',
            path: 'onboarding/' + id,
        })
    }

    saveToViewed(onboardingId: string): void {
        const onboardings = this.getViewed()
        onboardings.push(onboardingId)
        localStorage.setItem(this.viewedOnboardingsKey, JSON.stringify(onboardings))
    }


    isViewed(onboardingId: string): boolean {
        const onboardings = this.getViewed()
        return !(onboardings.indexOf(onboardingId) === -1)
    }

    getViewed(): string[] {
        const onboardings = localStorage.getItem(this.viewedOnboardingsKey)
        return onboardings ? JSON.parse(onboardings) : []
    }
}