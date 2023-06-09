import React, {FC} from 'react'
import './GameCard.css'
import {useNavigate} from "react-router-dom";
import EnergyIcon from "../../ui-kit/icons/EnergyIcon";
import BeavCoinIcon from "../../ui-kit/icons/BeavCoinIcon";

export interface IGameCard {
	readonly label: string
	readonly imageSrc: string
	readonly earnType: 'energy' | 'coins'
	readonly earnCount: number
	readonly energyCost: number
	readonly moralCost: number
	readonly navTo: string
}

interface IGameCardProp {
	readonly card: IGameCard
}

const GameCard: FC<IGameCardProp> = ({ card }) => {
	const navigate = useNavigate()
	const letsGo = (): void => navigate(card.navTo)

	return (
		<div className={'game-card'}>
			<div className={'game-card__label font-primary'}>
				{ card.label }
			</div>
			<img className={'game-card__image'} src={ card.imageSrc } alt={card.label} />



			<div className={'game-card__earn font-secondary'}>
				<span>+{card.earnCount}</span>
				{
					card.earnType === 'energy' ?
						<EnergyIcon /> :
						<BeavCoinIcon />
				}
			</div>
			<div className={'game-card__button-group font-secondary'}>
				{
					card.energyCost !== 0 && card.moralCost !== 0 ?
						<div className={'game-card__costs'}>
							<span className={'game-card__moral-cost'}>
								-{ card.moralCost }
							</span>
							<div className={'game-card__button-group-line'}></div>
							<span className={'game-card__energy-cost'}>
								-{ card.energyCost }
							</span>
						</div> : null
				}
				<div className={'game-card__nav-to'}
					 onClick={letsGo}>
					<span>Let's go!</span>
				</div>
			</div>
		</div>
	)
}

export default GameCard