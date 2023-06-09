import React, {FC} from 'react'
import './LootboxCard.css'
import {ILootbox} from "../../api/sporty/lootbox/interfaces/lootbox.interface";
import {useNavigate} from "react-router-dom";
import {clickSound} from "../../ui-kit/audio/button-audio.const";

interface ILootboxCardInterface {
	readonly lootbox: ILootbox
}

const LootboxCard: FC<ILootboxCardInterface> = ({ lootbox }) => {
	const navigate = useNavigate()

	const clickOnBuyButton = () => {
		clickSound.play()
		navigate('/lootbox-detail/' + lootbox.lootbox_id)
	}

	return (
		<div className={'lootbox-card'}>
			<div className={'lootbox-card__picture'}>
				<div className={'lootbox-card__gift'}></div>
			</div>

			<div className={'lootbox-card__buy font-secondary'}>
				<span>
					{ lootbox.cost } $VENOM
				</span>
				<button onClick={clickOnBuyButton}>
					BUY
				</button>
			</div>
		</div>
	)
}

export default LootboxCard