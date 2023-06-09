import React, {useEffect, useState} from 'react'
import './Market.css'
import Navbar from '../../components/navbar/Navbar'
import MainHeader from '../../components/main-header/MainHeader'
import UnderlineHeading from '../../ui-kit/underline-heading/UnderlineHeading'
import { useNavigate } from 'react-router-dom'
import {BeaverService} from "../../api/sporty/beaver/beaver.service";
import {LootboxService} from "../../api/sporty/lootbox/lootbox.service";
import LootboxCard from "../../components/lootbox-card/LootboxCard";
import {ILootbox} from "../../api/sporty/lootbox/interfaces/lootbox.interface";

const Market = () => {
    const navigate = useNavigate()

    const [lootboxes, setLootboxes] = useState<ILootbox[]>([])

    useEffect(() => {
        const lootboxService = new LootboxService()
        lootboxService.findAll()
            .then(
                (savedLootboxes) =>
                    setLootboxes(savedLootboxes)
            )

    }, [])

    return (
        <div className={'market'}>
            <div className={'market__background-gradient'}></div>
            <MainHeader title={'Marketplace'} />

            <UnderlineHeading text={'Lootboxes'} />
            <div className={'market__lootboxes-preview'}>
                {
                    lootboxes.map(
                        (lootbox) =>
                            <LootboxCard key={lootbox.lootbox_id} lootbox={lootbox} />
                    )
                }
            </div>

            <Navbar />
        </div>
    )
}

export default Market