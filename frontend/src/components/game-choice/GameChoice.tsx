import React, {useState} from 'react'
import './GameChoice.css'
import Switch, {TSwitchButtons} from "../../ui-kit/switch/Switch";
import Heading from "../../ui-kit/heading/Heading";
import GameCard, {IGameCard} from "../game-card/GameCard";

enum GameTab {
	AR = 'ar',
	GAMES = 'games',
}

type TGameChoiceTabs = {
	readonly [GameTab.AR]: IGameCard[]
	readonly [GameTab.GAMES]: IGameCard[]
}

const GameChoice = () => {
	const [activeTab, setActiveTab] = useState<GameTab>(GameTab.AR)

	const switchButtons: TSwitchButtons = {
		first: {
			id: GameTab.AR,
			label: 'AR-game',
			onClick: () => { setActiveTab(GameTab.AR) },
		},
		second: {
			id: GameTab.GAMES,
			label: 'Battle',
			onClick: () => { setActiveTab(GameTab.GAMES) },
		},
	}

	const tabs: TGameChoiceTabs = {
		ar: [
			{
				label: 'Whack',
				imageSrc: './images/CompetitionWhack.png',
				earnType: 'energy',
				earnCount: 1,
				energyCost: 0,
				moralCost: 0,
				navTo: '/whack',
			},
		],
		games: [
			{
				label: 'Battle',
				imageSrc: './images/CompetitionBattle.png',
				earnType: 'coins',
				earnCount: 1,
				energyCost: 1,
				moralCost: 1,
				navTo: '/opponent-search/battle',
			},
		],
	}

	return (
		<div className={'game-choice'}>
			<Heading text={'Games'} />
			<Switch buttons={switchButtons} />
			{
				tabs[activeTab].map(
					(card, index) =>
						<GameCard key={index} card={card} />
				)
			}
		</div>
	)
}

export default GameChoice