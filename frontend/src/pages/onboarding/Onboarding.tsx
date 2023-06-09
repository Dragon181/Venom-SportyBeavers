import React, { useEffect, useState } from 'react'
import { redirect, useLocation, useNavigate, useParams } from 'react-router-dom'
import { IOnboarding } from '../../api/sporty/onboarding/interfaces/onboarding.interface'
import { OnboardingService } from '../../api/sporty/onboarding/onboarding.service'
import OnboardingSlide from '../../components/onboarding-slide/OnboardingSlide'
import { clickSound } from '../../ui-kit/audio/button-audio.const'
import OnboardingNavigationDemo from '../../components/onboarding-navigation-demo/OnboardingNavigationDemo'

const Onboarding = () => {
    const onboardingService = new OnboardingService()

    const params = useParams<'onboarding_id'>()
    const location = useLocation()
    const navigate = useNavigate()

    const onboardingId = params.onboarding_id

    const nextLink = decodeURIComponent(
        location.search.slice(
            location.search.indexOf('=') + 1,
            location.search.length
        )
    )

    const nav2nextLink = (): void => {
        if (onboardingId) {
            onboardingService.saveToViewed(onboardingId)
        }
        navigate(nextLink)
    }

    if (onboardingId && onboardingService.isViewed(onboardingId)) {
        redirect(nextLink)
    }

    const [onboarding, setOnboarding] = useState<IOnboarding>({
        onboarding_id: 'main',
        slides: [
            {
                slide_id: 'first',
                slide_content: '../images/OnboardingSample.png',
                sort: 0,
            },
            {
                slide_id: 'second',
                slide_content: '../images/OnboardingSample.png',
                sort: 1,
            },
            {
                slide_id: 'third',
                slide_content: '../images/OnboardingSample.png',
                sort: 2,
            },
        ]
    })

    const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0)

    useEffect(() => {
        const onboardingService = new OnboardingService()

         if (typeof onboardingId !== 'undefined') {
             onboardingService.getOnboarding(onboardingId)
                .then((result) => {
                        if (result && typeof result !== 'undefined') {
                            result.slides.sort(
                                (a, b) => a.sort - b.sort
                            )
                            setOnboarding(result)
                        }
                    })
         }
    }, [navigate, nextLink, onboardingId])

    const onboardingCss: React.CSSProperties = {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
    }

    const onboardingSlidesCss: React.CSSProperties = {
        height: '100%',
        maxWidth: 'fit-content',
    }

    /*const closeButtonCss: React.CSSProperties = {
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='44' height='44' viewBox='0 0 44 44' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M23.1407 21.7276L34.4544 10.4139L33.0402 8.99969L21.7265 20.3134L10.6856 9.27246L9.2714 10.6867L20.3123 21.7276L8.99854 33.0413L10.4127 34.4555L21.7265 23.1418L33.313 34.7283L34.7272 33.3141L23.1407 21.7276Z' fill='white'/%3E%3C/svg%3E%0A")`,
        width: '44px',
        height: '44px',
        position: 'absolute',
        top: '20px',
        left: '12px',
        cursor: 'pointer',
    }*/

    const clickHandler = (event: React.MouseEvent<HTMLDivElement>): void => {
        clickSound.play()
        swipe(window.innerWidth / 2 <= event.clientX)
    }

    const swipe = (swipeNext: boolean): void => {
        if (swipeNext) {
            if (activeSlideIndex + 1 < onboarding.slides.length) {
                setActiveSlideIndex(activeSlideIndex + 1)
            } else if (activeSlideIndex + 1 === onboarding.slides.length) {
                nav2nextLink()
            }
        } else {
            if (activeSlideIndex !== onboarding.slides[0].sort) {
                setActiveSlideIndex(activeSlideIndex - 1)
            }
        }
    }

    return (
        <div style={onboardingCss} onClick={clickHandler}>
            <OnboardingNavigationDemo />
            {/*<div style={closeButtonCss} onClick={nav2nextLink}></div>*/}

            <div style={onboardingSlidesCss}>
                {
                    onboarding.slides.map(
                        (slide, index) =>
                            <OnboardingSlide slide={slide} key={index}
                                             active={slide.sort === activeSlideIndex} />
                    )
                }
            </div>
        </div>
    )
}

export default Onboarding