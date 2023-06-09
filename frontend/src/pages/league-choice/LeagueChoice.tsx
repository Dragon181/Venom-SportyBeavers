import React, { FC } from 'react'
import './LeagueChoice.css'
import MainHeader from '../../components/main-header/MainHeader'
import Navbar from '../../components/navbar/Navbar'
import LeagueChoiceSlider from '../../components/league-choice-slider/LeagueChoiceSlider'

const LeagueChoice: FC = () => {
    return (
        <div className={'league-choice'}>
            <MainHeader title={'Leagues'} />
            <LeagueChoiceSlider />
            <Navbar />
        </div>
    )
}

export default LeagueChoice