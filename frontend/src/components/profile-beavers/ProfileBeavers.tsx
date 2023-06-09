import React, { FC } from 'react'
import './ProfileBeavers.css'
import { Beaver } from '../../api/sporty/beaver/interfaces/beaver.interface'
import Heading from '../../ui-kit/heading/Heading'
import { useNavigate } from 'react-router-dom'
import { BeaverService } from '../../api/sporty/beaver/beaver.service'

export interface IProfileBeaverCard {
    readonly beaver: Beaver
}

const ProfileBeaverCard: FC<IProfileBeaverCard> = ({ beaver }) => {
    const navigate = useNavigate()

    const nav2detail = (): void => navigate('/beaver-detail/' + beaver.beaver_id)

    return (
        <div className={'profile-beavers__item'} onClick={ nav2detail }>
            <Heading text={'Beaver'} />
            <div className={'profile-beavers__item-properties font-secondary'}>
                <div className={'profile-beavers__item-prop'}>{ BeaverService.translateBeaverRarity(beaver.rarity) }</div>
                <div className={'profile-beavers__item-prop'}>Level { beaver.level }</div>
                {
                    beaver.is_nft ?
                        <div className={'profile-beavers__item-prop'}>NFT</div> : null
                }

            </div>
            <div className={'profile-beavers__item-image'}>
                <img src={beaver.picture_url} alt={beaver.beaver_id} />
            </div>
        </div>
    )
}

export interface IProfileBeavers {
    readonly beavers: Beaver[]
}

const ProfileBeavers: FC<IProfileBeavers> = ({ beavers }) => {
    return (
        <div className={'profile-beavers__wrapper'}>
            <div className={'profile-beavers'}>
                {
                    beavers.map(
                        (beaver) =>
                            <ProfileBeaverCard key={beaver.beaver_id} beaver={beaver} />
                    )
                }
            </div>

        </div>
    )
}

export default ProfileBeavers