import React, {useEffect, useState} from 'react'
import './AfterWhack.css'
import PrimaryButton from "../../ui-kit/primary-button/PrimaryButton";
import SecondaryButton from "../../ui-kit/secondary-button/SecondaryButton";
import {Howl} from "howler";
import {useNavigate} from "react-router-dom";
import {WhackService} from "../../api/sporty/whack/whack.service";
import {UserService} from "../../api/sporty/user/user.service";

const AfterWhack = () => {
	const navigate = useNavigate()

	const [punchesCount, setPunchesCount] = useState<number>(0)
	const [missCount, setMissCount] = useState<number>(0)

	useEffect(() => {
		new Howl({
			src: './audio/success-fanfare.mp3',
			autoplay: true
		})

		setPunchesCount(
			localStorage.getItem('SportyBeavers__whack-counter') ?
				Number(localStorage.getItem('SportyBeavers__whack-counter')) : 0
		)

		setMissCount(
			localStorage.getItem('SportyBeavers__whack-miss-count') ?
				Number(localStorage.getItem('SportyBeavers__whack-miss-count')) : 0
		)
	}, [])

	/*const getEarnedEnergy = (): number => {
		if (missCount === 0) return 0

		const successfulPunchesPercent = Math.round(
			punchesCount / missCount * 100
		)

		if (successfulPunchesPercent < 20) {
			return 1
		} else {
			return Math.round(successfulPunchesPercent / 20)
		}
	}*/

	/*const earnedEnergy = missCount === 0 ?
		0 :
		Math.floor(punchesCount / missCount * 100) / 2*/

	const nav = (to: string) => {
		const whackService = new WhackService()
		whackService.sendResult(punchesCount, missCount)
			.then(() => {
				const userService = new UserService()
				userService.refreshUser()
					.then(() => navigate(to))
			})
	}

	return (
		<div className={'after-whack'}>
			<div className={'after-whack__title font-primary'}>
				Excellent result!
			</div>
			<div className={'after-whack__title-underline'}></div>

			<div className={'after-whack__stats'}>
				<div className={'after-whack__stats-info'}>
					<div className={'after-whack__stats-title'}>
						<div id={'punches'} className={'after-whack__stats-icon'}></div>
						<div className={'after-whack__stats-label font-secondary'}>
							Successful touches
						</div>
					</div>

					<div className={'after-whack__stats-count font-secondary'}>
						{ punchesCount }<span>/{ missCount }</span>
					</div>
				</div>

				<div className={'after-whack__stats-line'}></div>

				<div className={'after-whack__stats-info'}>
					<div className={'after-whack__stats-title'}>
						<div id={'energy'} className={'after-whack__stats-icon'}></div>
						<div className={'after-whack__stats-label font-secondary'}>
							Earned energy
						</div>
					</div>

					<div className={'after-whack__stats-count font-secondary'}>
						{/*{ getEarnedEnergy() }<span>/5</span>*/}
						1
					</div>
				</div>
			</div>

			<div className={'after-whack__buttons'}>
				<PrimaryButton label={'Repeat'} onClick={ () => nav('/whack') } />
				<SecondaryButton label={'To Menu'} onClick={ () => nav('/main') } />
			</div>

			<div className={'after-whack__beaver'}></div>

			<div className={'after-whack__gradient'}></div>
		</div>
	)
}

export default AfterWhack