import React, { FC, useEffect, useState } from 'react'
import './BeaverDetailButtons.css'
import { closeModal, Modal, openModal } from '../modal/Modal'
import PrimaryButton from '../../ui-kit/primary-button/PrimaryButton'
import Heading from '../../ui-kit/heading/Heading'
import SecondaryText from '../../ui-kit/secondary-text/SecondaryText'
import SecondaryButton from '../../ui-kit/secondary-button/SecondaryButton'
import { UserService } from '../../api/sporty/user/user.service'
import { Beaver } from '../../api/sporty/beaver/interfaces/beaver.interface'
import { BeaverService } from '../../api/sporty/beaver/beaver.service'
import { useNavigate } from 'react-router-dom'
import Points from '../points/Points'
import {clickSound} from "../../ui-kit/audio/button-audio.const";

export interface IBeaverDetailButtons {
    readonly beaver: Beaver
}

const BeaverDetailButtons: FC<IBeaverDetailButtons> = ({ beaver }) => {
    const [readyForLevelUp, setReadyForLevelUp] = useState<boolean>(false)

    const [beaverActiveIndex, setBeaverActiveIndex] = useState<number>(0)

    const [levelUpCost, setLevelUpCost] = useState<number>(1)

    const navigate = useNavigate()

    useEffect(() => {
        const userService = new UserService()
        const user = userService.getFromLocalStorage()

        const beaverService = new BeaverService()
        const levelUpCost: number = beaverService.getLevelUpCost(
            (beaver && beaver.level) ? beaver.level : 1
        )

        setLevelUpCost(levelUpCost)

        setBeaverActiveIndex(
            user ?
                user.beavers.findIndex(
                    (beaverItem) => beaver && beaverItem.beaver_id === beaver.beaver_id
                ) : 0
        )

        setReadyForLevelUp(!!user && (user.beav >= levelUpCost))
    }, [beaver])

    const readyForLevelUpModalId = 'level-up-modal-ready'
    const notReadyForLevelUpModalId = 'level-up-modal-not-ready'

    const openLevelUpModal = () => {
        if (readyForLevelUp) {
            openModal(readyForLevelUpModalId)
        } else {
            openModal(notReadyForLevelUpModalId)
        }
    }

    const getLevelUp = (): void => {
        if (beaver && typeof beaver !== 'undefined') {
            const beaverService = new BeaverService()
            beaverService.levelUp(beaver.beaver_id)
                .then(() => navigate('/main'))
        }
    }

    const mintBeaver = async (): Promise<void> => {
        clickSound.play()
        const beaverService = new BeaverService()
        await beaverService.mint(beaver)
    }

    return (
        <div className={'beaver-detail-buttons'}>
            {
                beaver.is_nft ?
                    null :
                    <button className={'beaver-detail__mint-button font-primary'}
                            onClick={mintBeaver}>
                        Mint Beaver
                        <div className={'beaver-detail__mint-button-arrow'}></div>
                    </button>
            }

            <button className={'beaver-detail__level-up-button font-primary'}
                    onClick={ openLevelUpModal }>
                Upgrade to<br />new level!
                <div className={'beaver-detail__level-up-arrow'}></div>
            </button>

            <Points activeIndex={beaverActiveIndex} />

            <Modal id={readyForLevelUpModalId}>
                <div className={'level-up-image'}>
                    <img src={'../images/ReadyForLevelUp.png'} alt={'ReadyForLevelUp'} />
                </div>
                <Heading text={'Beaver is ready for upgrade!'} />
                <SecondaryText text={'Congratulations! Your beaver is ready to get to the next level!'} />
                <PrimaryButton label={'Upgrade for'} cost={levelUpCost + ' $BEAV'} onClick={ getLevelUp } />
                <SecondaryButton label={'Not now'} onClick={ closeModal } />
            </Modal>

            <Modal id={notReadyForLevelUpModalId}>
                <div className={'level-up-image'}>
                    <img src={'../images/NotReadyForLevelUp.png'} alt={'NotReadyForLevelUp'} />
                </div>
                <Heading text={'Beaver is not ready yet for upgrade'} />
                <SecondaryText text={'You have not enough BEAV for upgrade. Let\'s earn it!'} />
                <PrimaryButton label={'Upgrade for'} cost={levelUpCost + ' $BEAV'} disabled={true} onClick={ getLevelUp } />
                <SecondaryButton label={'Earn $BEAV'} onClick={ () => navigate('/main') } />
            </Modal>
        </div>
    )
}

export default BeaverDetailButtons