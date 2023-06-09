import React, { FC, useEffect, useState } from 'react'
import './BeaverDetail.css'
import { useParams } from 'react-router-dom'
import { Beaver } from '../../api/sporty/beaver/interfaces/beaver.interface'
import { BeaverService } from '../../api/sporty/beaver/beaver.service'
import CompetitionsHeader from '../../components/competitions-header/CompetitionsHeader'
import Navbar from '../../components/navbar/Navbar'
import Heading from '../../ui-kit/heading/Heading'
import BeaverDetailProperties from '../../components/beaver-detail-properties/BeaverDetailProperties'
import BeaverDetailPoints from '../../components/beaver-detail-points/BeaverDetailPoints'
import BeaverDetailButtons from '../../components/beaver-detail-buttons/BeaverDetailButtons'
import { User } from '../../api/sporty/user/interfaces/user.interface'
import { UserService } from '../../api/sporty/user/user.service'

const BeaverDetail: FC = () => {
    const params = useParams<'beaver_id'>()
    const beaverId = params.beaver_id

    const [user, setUser] = useState<User>()

    const [beaver, setBeaver] = useState<Beaver>()

    useEffect(() => {
        if (typeof beaverId !== 'undefined') {
            const beaverService = new BeaverService()
            beaverService.findOne(beaverId)
                .then((beaver) => setBeaver(beaver))
        }
        const userService = new UserService()
        const user = userService.getFromLocalStorage()
        setUser(user)
    }, [beaverId])

    return (
        <div className={'beaver-detail'}>
            <div className={'beaver-detail__background'}></div>
            <div className={'beaver-detail__background-gradient'}></div>

            <div className={'beaver-detail__content'}>
                <CompetitionsHeader />

                <Heading text={'Beaver'} />
                <BeaverDetailProperties isNft={(beaver && beaver.is_nft) ? beaver.is_nft : false}
                                        level={ (beaver && beaver.level) ? beaver.level : 1 }
                                        rarity={ (beaver && beaver.rarity) ?
                                            BeaverService.translateBeaverRarity(beaver.rarity) :
                                            'Common'} />

                <div className={'beaver-detail__image'}>
                    <img src={beaver ? beaver.picture_url : ''} alt={'beaver-detail'} />
                </div>

                {
                    user && beaver && beaver.owner_user_id === user.user_id ?
                        <BeaverDetailButtons beaver={beaver} /> : null
                }

                <BeaverDetailPoints strength={ beaver ? beaver.strength : 0 }
                                    agility={ beaver ? beaver.agility : 0 }
                                    endurance={ beaver ? beaver.endurance : 0 }
                                    will={ user ? user.moral : 0 } />

                <Navbar/>
            </div>
        </div>
    )
}

export default BeaverDetail