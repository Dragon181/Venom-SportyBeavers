import React from 'react'
import CompetitionsHeader from '../../components/competitions-header/CompetitionsHeader'
import UnderlineHeading from '../../ui-kit/underline-heading/UnderlineHeading'
import MarketBeaver from '../../components/market-beaver/MarketBeaver'
import { BeaverService } from '../../api/sporty/beaver/beaver.service'

const MarketBeavers = () => {
    const beaversContainerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    }

    const backgroundGradientStyle: React.CSSProperties = {
        position: 'absolute',
        width: '330px',
        height: '330px',
        left: 'calc(50% - 165px)',
        top: '-133px',
        background: '#254EDB',
        filter: 'blur(90px)',
        transform: 'translate3d(0, 0, 0)',
    }

    /* temp */
    const beaverService = new BeaverService()
    const activeBeaver = beaverService.getActiveBeaverFromLocalStorage()

    return (
        <div>
            <div style={backgroundGradientStyle}></div>

            <CompetitionsHeader />
            <UnderlineHeading text={'Beavers'} />
            <div style={beaversContainerStyle}>
                <MarketBeaver beaver={activeBeaver} cost_beav={20} cost_money={10} />
                <MarketBeaver beaver={activeBeaver} cost_beav={20} cost_money={10} />
                <MarketBeaver beaver={activeBeaver} cost_beav={20} cost_money={10} />
                <MarketBeaver beaver={activeBeaver} cost_beav={20} cost_money={10} />
                <MarketBeaver beaver={activeBeaver} cost_beav={20} cost_money={10} />
                <MarketBeaver beaver={activeBeaver} cost_beav={20} cost_money={10} />
                <MarketBeaver beaver={activeBeaver} cost_beav={20} cost_money={10} />
                <MarketBeaver beaver={activeBeaver} cost_beav={20} cost_money={10} />
                <MarketBeaver beaver={activeBeaver} cost_beav={20} cost_money={10} />
                <MarketBeaver beaver={activeBeaver} cost_beav={20} cost_money={10} />
                <MarketBeaver beaver={activeBeaver} cost_beav={20} cost_money={10} />
                <MarketBeaver beaver={activeBeaver} cost_beav={20} cost_money={10} />
            </div>
        </div>
    )
}

export default MarketBeavers