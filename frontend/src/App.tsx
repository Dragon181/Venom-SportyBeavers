import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

import StartPage from './pages/start-page/StartPage'
import Main from './pages/main/Main'
import Configurator from './pages/configurator/Configurator'
import Profile from './pages/profile/Profile'
import Market from './pages/market/Market'
import BeforeConfigurator from './pages/before-configurator/BeforeConfigurator'
import LeagueChoice from './pages/league-choice/LeagueChoice'
import Battle from './pages/battle/Battle'
import OpponentSearch from './pages/opponent-search/OpponentSearch'
import BeaverDetail from './pages/beaver-detail/BeaverDetail'
import AfterConfigurator from './pages/after-configurator/AfterConfigurator'
import GameWin from './pages/game-win/GameWin'
import GameLose from './pages/game-lose/GameLose'
import GameDraw from './pages/game-draw/GameDraw'
import MarketBeavers from './pages/market-beavers/MarketBeavers'
import Preloader from './ui-kit/preloader/Preloader'
import ErrorModal from './components/error-modal/ErrorModal'
import Onboarding from './pages/onboarding/Onboarding'
import Whack from "./pages/whack/Whack";
import AfterWhack from "./pages/after-whack/AfterWhack";
import LootboxDetail from "./pages/lootbox-detail/LootboxDetail";
import LootboxOpening from "./pages/lootbox-opening/LootboxOpening";

const App = () => {
    return (
        <div className={'App'}>
            <Routes>
                <Route path={'/'} element={ <StartPage /> } />
                <Route path={'/main'} element={ <Main /> } />
                <Route path={'/before-config'} element={ <BeforeConfigurator /> } />
                <Route path={'/config'} element={ <Configurator /> } />
                <Route path={'/profile'} element={ <Profile /> } />
                <Route path={'/market'} element={ <Market /> } />
                <Route path={'/league-choice'} element={ <LeagueChoice /> } />
                <Route path={'/battle'} element={ <Battle /> } />
                <Route path={'/opponent-search/:for'} element={ <OpponentSearch /> } />
                <Route path={'/beaver-detail/:beaver_id'} element={ <BeaverDetail /> } />
                <Route path={'/after-configurator'} element={ <AfterConfigurator /> } />
                <Route path={'/game-win'} element={ <GameWin /> } />
                <Route path={'/game-lose'} element={ <GameLose /> } />
                <Route path={'/game-draw'} element={ <GameDraw /> } />
                <Route path={'/market-beavers'} element={ <MarketBeavers /> } />
                <Route path={'/onboarding/:onboarding_id'} element={ <Onboarding /> } />
                <Route path={'/whack'} element={ <Whack /> } />
                <Route path={'/after-whack'} element={ <AfterWhack /> } />
                <Route path={'/lootbox-detail/:lootbox_id'} element={ <LootboxDetail /> } />
                <Route path={'/lootbox-opening/:lootbox_id'} element={ <LootboxOpening /> } />
            </Routes>
            <Preloader />
            <ErrorModal />
        </div>
    )
}

export default App
