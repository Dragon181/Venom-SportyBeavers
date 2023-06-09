import React, { FC } from 'react'
import './BeaverItem.css'
import { useNavigate } from 'react-router-dom'
import Heading from '../../ui-kit/heading/Heading'
import SecondaryText from '../../ui-kit/secondary-text/SecondaryText'
import { Beaver } from '../../api/sporty/beaver/interfaces/beaver.interface'
import { BeaverService } from '../../api/sporty/beaver/beaver.service'

export interface IBeaverItem {
    readonly active: boolean
    readonly beaver: Beaver
}

const BeaverItem: FC<IBeaverItem> = ({ beaver, active }) => {
    const itemClassName = active ?
        'beavers-item beavers-item_active' :
        'beavers-item'

    const navigate = useNavigate()

    const nav2beaverDetail = (beaver_id: string): void => {
        navigate('/beaver-detail/' + beaver_id)
    }

    return (
        <div className={ itemClassName } onClick={ () => nav2beaverDetail(beaver.beaver_id) } >
            <img className={'beavers-item__background'} src={'../images/BeaverItemBackground.png'} alt={'background'} />
            <img className={'beavers-item__image'} src={beaver.picture_url} alt={'My beaver'} />
            <Heading text={beaver.name} />
            <SecondaryText text={`Level ${beaver.level} • ${BeaverService.translateBeaverRarity(beaver.rarity)}`} />
        </div>
    )
}

export default BeaverItem