import React from 'react'

import './Main.css'

import Navbar from '../../components/navbar/Navbar'
import Beavers from '../../components/beavers/Beavers'
import MainHeader from '../../components/main-header/MainHeader'
import GameChoice from "../../components/game-choice/GameChoice";

const Main = () => {
    return (
        <div className={'main'}>
            <MainHeader title={'My beaver'} />

            <Beavers />

            <GameChoice />

            <Navbar />
        </div>
    )
}

export default Main