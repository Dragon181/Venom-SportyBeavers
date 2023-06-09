import React, { useEffect, useState } from 'react'
import './OpponentSearch.css'
import Heading from '../../ui-kit/heading/Heading'
import { useNavigate, useParams } from 'react-router-dom'
import { BeaverService } from '../../api/sporty/beaver/beaver.service'
import { Howl } from 'howler'
import { BattleService } from '../../api/sporty/battle/battle.service'

const OpponentSearch = () => {
    const params = useParams<'for'>()
    const competitionType = typeof params.for === 'undefined' ? 'run' : params.for

    const navigate = useNavigate()

    const [nextLink] = useState<string>('/' + competitionType)

    const [oppFound, setOppFound] = useState<boolean>(false)

    const [oppActive, setOppActive] = useState<boolean>(true)

    const [foundBeaverImage, setFoundBeaverImage] = useState<string | null>(null)

    const [foundBeaverImageOpacity, setFoundBeaverImageOpacity] = useState<number>(0)

    const sound = new Howl({
        src: [
            competitionType === 'run' ?
                '../audio/mysterious-bass-pulse.wav' :
                '../audio/dark-guitar.mp3'
        ]
    })
    sound.load()

    /** Breath animation */
    useEffect(() => {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                setOppActive(Boolean(i % 2))
            }, (i + 1) * 3000)
        }
    }, [])

    /** Main action, get competition object from api */
    useEffect(() => {
        sound.play()

        const beaverService = new BeaverService()
        const activeBeaver = beaverService.getActiveBeaverFromLocalStorage()

        if (competitionType === 'battle') {
            const battleService = new BattleService()
            battleService.getBattle(activeBeaver.beaver_id).then()
        }
    }, [])

    /** Show up battle searching results */
    useEffect(() => {
        const fakeSearchingTime = Math.floor(Math.random() * 3000) + 7000

        /** Show opponent picture */
        setTimeout(() => {
            sound.fade(1, 0.3, 5000)
            setOppFound(true)

            if (competitionType === 'battle') {
                const battleService = new BattleService()
                const battle = battleService.getBattleFromLocalStorage()
                setFoundBeaverImage(battle.opponents.second_beaver.picture_url)
            }
            setFoundBeaverImageOpacity(1)
        }, fakeSearchingTime)

        /** Move to competition page */
        setTimeout(() => {
            sound.stop()
            navigate(nextLink)
        }, fakeSearchingTime + 5000)
    }, [])

    const oppClassName = oppActive ?
        'opponent-search__opponent opponent-search__opponent_active' :
        'opponent-search__opponent'
    const gradientClassName = oppActive ?
        'opponent-search__background-gradient opponent-search__background-gradient_active' :
        'opponent-search__background-gradient'

    const headingTitle = oppFound ? 'Your opponent' : 'Search of opponent'

    return (
        <div className={'opponent-search'}>
            <Heading text={ headingTitle } />
            <div className={ oppClassName } style={{
                opacity: foundBeaverImage ? 0 : 1
            }}></div>
            <div className={ gradientClassName }></div>
            <div className={'opponent-search__found-beaver'} style={{
                opacity: foundBeaverImageOpacity,
                transition: 'opacity 2s ease-in-out'
            }}>
                {
                    foundBeaverImage ?
                        <img src={foundBeaverImage} alt={'foundBeaverImage'} /> : null
                }
            </div>
            <div className={'opponent-search__question'}></div>
        </div>
    )
}

export default OpponentSearch