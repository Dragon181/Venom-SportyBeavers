import React, { FC } from 'react'
import './BeaverDetailProperties.css'

export interface IBeaverDetailProperties {
    readonly isNft: boolean
    readonly rarity: string
    readonly level: number
}

const BeaverDetailProperties: FC<IBeaverDetailProperties> = ({ isNft, rarity, level }) => {
    const nftActiveClass = isNft ? ' beaver-detail__nft_active': ''
    return (
        <div className={'beaver-detail__properties'}>
            <div className={'beaver-detail__rarity font-secondary'}>{ rarity }</div>
            <div className={'beaver-detail__level font-secondary'}>{ level } level</div>
            <div className={'beaver-detail__nft font-secondary' + nftActiveClass}>
                NFT
            </div>
        </div>
    )
}

export default BeaverDetailProperties