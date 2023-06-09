import React, {useEffect, useState} from 'react'
import BackButton from "../../ui-kit/back-button/BackButton";
import PrimaryButton from "../../ui-kit/primary-button/PrimaryButton";
import {LootboxService} from "../../api/sporty/lootbox/lootbox.service";
import {useNavigate, useParams} from "react-router-dom";
import {ILootbox} from "../../api/sporty/lootbox/interfaces/lootbox.interface";
import './LootboxDetail.css'
import {VenomConnect} from "venom-connect";
import {UserService} from "../../api/sporty/user/user.service";

const LootboxDetail = () => {
	const navigate = useNavigate()
    const params = useParams<'lootbox_id'>()
    const lootboxId = params.lootbox_id ? params.lootbox_id : ''

    const lootboxService = new LootboxService()

    const [lootbox, setLootbox] = useState<ILootbox>(lootboxService.emptyLootbox)

    useEffect(() => {
        lootboxService.findOne(lootboxId)
            .then(savedLootbox => setLootbox(savedLootbox))
    }, [])

	const buyButtonClick = async () => {
		lootboxService.buyLootbox(lootbox)
			.then(() => {
				navigate('/lootbox-opening/' + lootbox.lootbox_id)
			})
	}

	return (
		<div className={'lootbox-detail font-secondary'}>
			<div className={'lootbox-detail__gradient'}></div>
            <BackButton />

            <div className={'lootbox-detail__gift'}></div>
            <h3>Lootbox</h3>
            <p>You can win one of them</p>

            <div className={'lootbox-detail__chances'}>
				<div className={'lootbox-detail__chance-item'}>
					<div className={'lootbox-detail__chance-picture'}></div>
					<span>Rare Beaver NFT</span>
					<p>Drop chance 20%</p>
				</div>
				<div className={'lootbox-detail__chance-item'}>
					<div className={'lootbox-detail__chance-picture'}></div>
					<span>Some $BEAV</span>
					<p>Drop chance 80%</p>
				</div>
            </div>

			{
				lootbox.cost ?
					<PrimaryButton label={'Buy lootbox'} onClick={buyButtonClick} cost={lootbox.cost + ' $VENOM'} /> :
					<PrimaryButton label={'Buy lootbox'} onClick={buyButtonClick} />
			}
		</div>
	)
}

export default LootboxDetail