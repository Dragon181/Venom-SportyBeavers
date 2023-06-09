import React, { FC, useState } from 'react'
import './LeagueChoiceSlider.css'
import Heading from '../../ui-kit/heading/Heading'
import SecondaryText from '../../ui-kit/secondary-text/SecondaryText'
import { leagueSlider } from './league-slider.const'
import { BeaverService } from '../../api/sporty/beaver/beaver.service'
import PrimaryButton from '../../ui-kit/primary-button/PrimaryButton'
import { useNavigate } from 'react-router-dom'
import PrevArrow from '../../ui-kit/slider-arrows/PrevArrow'
import NextArrow from '../../ui-kit/slider-arrows/NextArrow'
import { clickSound } from '../../ui-kit/audio/button-audio.const'

export interface ILeague {
    readonly id: number
    readonly imageSrc: string
    readonly title: string
    readonly description: string
    readonly gain: number
}

export interface ILeagueChoiceSlider {
    readonly leagues: ILeague[]
}

const LeagueChoiceSlider: FC = () => {
    const [activeLeague, setActiveLeague] = useState<number>(
        leagueSlider.leagues[0].id
    )

    const beaverService = new BeaverService()
    const activeBeaver = beaverService.getActiveBeaverFromLocalStorage()

    const navigate = useNavigate()
    const nav2competitions = (): void => {
        navigate('/competitions')
    }


    const getSliderButtonLabel = (): string => {
        if (activeBeaver && activeBeaver.level) {
            if (activeBeaver.level === activeLeague) {
                return 'Play'
            } else if (activeBeaver.level <= activeLeague) {
                return 'Available on higher levels'
            }
        }
        return `Available for level ${activeLeague} Beavers`
    }

    const sliderButtonLabel = getSliderButtonLabel()
    const sliderButtonDisabled = !(activeBeaver && activeBeaver.level && activeBeaver.level === activeLeague)


    const [touchStartX, setTouchStartX] = useState<number>(0)

    const swipe = (swipeNext: boolean): void => {
        if (swipeNext) {
            if (activeLeague + 1 <= leagueSlider.leagues.length) {
                setActiveLeague(activeLeague + 1)
            }
        } else {
            if (activeLeague !== leagueSlider.leagues[0].id) {
                setActiveLeague(activeLeague - 1)
            }
        }
    }

    const clickHandler = (event: React.MouseEvent<HTMLDivElement>): void => {
        clickSound.play()
        swipe(window.innerWidth / 2 <= event.clientX)
    }

    const swipeHandler = (event: React.TouchEvent<HTMLDivElement>): void => {
        if (event.changedTouches[0].clientX === touchStartX) return
        swipe(event.changedTouches[0].clientX < touchStartX)
    }

    const touchStartHandler = (event: React.TouchEvent<HTMLDivElement>): void => {
        setTouchStartX(event.touches[0].clientX)
    }

    return (
        <div className={'league-choice-slider'}>
            <PrevArrow onClick={clickHandler}/>
            <NextArrow onClick={clickHandler} />

            <div className={'league-slider-items'}>
                <div className={'league-slider__background-gradient'}></div>
                {
                    leagueSlider.leagues.map(
                        (league) =>
                            <div id={'league-' + league.id} key={league.id}
                                 onClick={ clickHandler }
                                 onTouchStart={ touchStartHandler }
                                 onTouchEnd={ swipeHandler }
                                 className={
                                     activeLeague === league.id ?
                                         'league-slider-item league-slider-item_active' :
                                         'league-slider-item'
                                 }>
                                <img src={ league.imageSrc } alt={'league-' + league.id} />
                                <Heading text={ league.title } />
                                <SecondaryText text={ league.description } />

                                <div className={'league-slider-item__gain'}>
                                    <span className={'font-secondary'}>Win</span>
                                    <Heading text={ league.gain + '$BEAV'} />
                                </div>
                            </div>
                    )
                }
            </div>

            <div className={'league-slider__pagination'}>
                {
                    leagueSlider.leagues.map(
                        (item, index) =>
                            <div key={'pagination-item-' + item.id }
                                 className={ index + 1 === activeLeague ?
                                    'league-slider__pagination-item league-slider__pagination-item_active' :
                                    'league-slider__pagination-item'
                            }></div>
                    )
                }
            </div>

            <PrimaryButton label={sliderButtonLabel} onClick={ nav2competitions } disabled={sliderButtonDisabled} />
        </div>
    )
}

export default LeagueChoiceSlider