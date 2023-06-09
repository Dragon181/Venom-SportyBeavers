import React, {useEffect, useState} from 'react'
import './LootboxOpening.css'
import {useNavigate, useParams} from "react-router-dom";
import {LootboxService} from "../../api/sporty/lootbox/lootbox.service";
import {ILootbox} from "../../api/sporty/lootbox/interfaces/lootbox.interface";
import {UserService} from "../../api/sporty/user/user.service";
import {Howl} from "howler";

const LootboxOpening = () => {
    const navigate = useNavigate()
    const params = useParams<'lootbox_id'>()
    const lootboxId = params.lootbox_id ? params.lootbox_id : ''

    const lootboxService = new LootboxService()

    const [lootbox, setLootbox] = useState<ILootbox>(lootboxService.emptyLootbox)

	const [opened, setOpened] = useState<boolean>(false)
	const [isNFT, setIsNFT] = useState<boolean>(false)

	const winSound = new Howl({
		src: ['../audio/success-fanfare.mp3']
	})

    useEffect(() => {
        lootboxService.findOne(lootboxId)
            .then(savedLootbox => {
				setLootbox(savedLootbox)

				setTimeout(() => {
					lootboxService.open(savedLootbox)
						.then((is_nft) => {

							winSound.play()

							setOpened(true)
							setIsNFT(is_nft)

							setTimeout(() => {
								const userService = new UserService()
								userService.refreshUser()
									.then(() => {
										navigate('/main')
									})
							}, 5000)
						})
				}, 5000)
			})
    }, [])

	return (
		<div className={'lootbox-opening'}>
            <div className={'lootbox-opening__circle'}></div>
			<div className={'lootbox-opening__gradient'}></div>

			{
				opened ?
					<div className={'lootbox-opening__prize'}>
						{
							isNFT ?
								<div className={'lootbox-opening__prize_nft'}
									 style={{
										 backgroundImage: "url('" + lootbox.beaver_image_src + "')",
									 }}></div> :
								<div className={'lootbox-opening__prize_beav'}></div>
						}
					</div> :
					<div className={'lootbox-opening__gift'}></div>
			}
		</div>
	)
}

export default LootboxOpening