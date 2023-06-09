import React, { FC } from 'react'
import './MarketBeaver.css'
import { Beaver } from '../../api/sporty/beaver/interfaces/beaver.interface'
import Heading from '../../ui-kit/heading/Heading'
import { BeaverService } from '../../api/sporty/beaver/beaver.service'

export interface IMarketBeaver {
    readonly beaver: Beaver
    readonly cost_beav: number
    readonly cost_money: number
}

const MarketBeaver: FC<IMarketBeaver> = (
    { beaver, cost_beav, cost_money }
) => {
    return (
        <div className={'market-beaver'}>
            <div className={'market-beaver__image'}>
                <img src={beaver.picture_url} alt={beaver.beaver_id} />
            </div>
            <Heading text={'Beaver #'} />
            <div className={'market-beaver__text font-secondary'}>
                { BeaverService.translateBeaverRarity(beaver.rarity) } • Level { beaver.level }
            </div>
            <div className={'market-beaver__cost font-secondary'}>
                { cost_beav } $BEAV
            </div>
        </div>
    )
}

export default MarketBeaver