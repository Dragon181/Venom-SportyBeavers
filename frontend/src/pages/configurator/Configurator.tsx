import React, { FC, useEffect, useState } from 'react'
import './Configurator.css'
import {
    BeaverBody,
    BeaverEyes,
    BeaverHead,
    BeaverLowerPaws,
    BeaverMouth,
    BeaverTail,
    BeaverUpperPaws,
    IBeaverConfig,
    IPreviewImages,
} from './beaver-config.interface'
import {
    beaverConfigTabs,
    blueUpperPaws,
    brownUpperPaws,
    defaultUpperPaws,
    lightOrangeUpperPaws,
    violetUpperPaws,
} from './tabs.const'
import { IBeaverConfigCard, IBeaverConfigTab } from './beaver-config-tab.interface'
import { useNavigate } from 'react-router-dom'
import { closeModal, Modal, openModal } from '../../components/modal/Modal'
import PrimaryButton from '../../ui-kit/primary-button/PrimaryButton'
import SecondaryButton from '../../ui-kit/secondary-button/SecondaryButton'
import { BeaverService } from '../../api/sporty/beaver/beaver.service'
import { UserService } from '../../api/sporty/user/user.service'
import { closePreloader, openPreloader } from '../../ui-kit/preloader/Preloader'

const initialConfig: IBeaverConfig = {
    body: BeaverBody.DEFAULT,
    eyes: BeaverEyes.DEFAULT,
    head: BeaverHead.DEFAULT,
    mouth: BeaverMouth.DEFAULT,
    upperPaws: BeaverUpperPaws.DEFAULT_DEFAULT,
    lowerPaws: BeaverLowerPaws.DEFAULT,
    tail: BeaverTail.DEFAULT
}

const initialPreviewLayers: IPreviewImages = {
    body: beaverConfigTabs[0].cards[0].imageSrc,
    head: beaverConfigTabs[1].cards[0].imageSrc,
    eyes: beaverConfigTabs[2].cards[0].imageSrc,
    mouth: beaverConfigTabs[3].cards[0].imageSrc,
    upperPaws: beaverConfigTabs[4].cards[0].imageSrc,
    lowerPaws: beaverConfigTabs[5].cards[0].imageSrc,
    tail: beaverConfigTabs[6].cards[0].imageSrc
}

const Configurator: FC = () => {
    const [config, setConfig] = useState<IBeaverConfig>(initialConfig)

    const [activeTab, setActiveTab] = useState<IBeaverConfigTab['id']>(beaverConfigTabs[0].id)

    const navigate = useNavigate()

    const [previewLayers, setPreviewLayers] = useState<IPreviewImages>(initialPreviewLayers)

    const [bodyColor, setBodyColor] = useState<BeaverBody>(BeaverBody.DEFAULT)
    const [upperPaws, setUpperPaws] = useState<IBeaverConfigCard[]>([
        {
            id: BeaverUpperPaws.DEFAULT_DEFAULT,
            imageSrc: './images/layers/UpperPaws_Default.png',
        },
        {
            id: BeaverUpperPaws.DEFAULT_PHONE,
            imageSrc: './images/layers/UpperPaws_Phone.png',
        },
        {
            id: BeaverUpperPaws.DEFAULT_DUMBBELLS,
            imageSrc: './images/layers/UpperPaws_Dumbbells.png',
        },
        {
            id: BeaverUpperPaws.DEFAULT_LOLLIPOP,
            imageSrc: './images/layers/UpperPaws_Lollipop.png',
        },
    ])

    useEffect(() => {
        setBodyColor(config.body)
    }, [config.body])

    useEffect(() => {
        const changeCurrentUpperPaws = (bodyColor: BeaverBody): void => {
            /** Enum key like 'LIGHT_ORANGE' */
            const bodyColorKey: string = BeaverBody[bodyColor]
            const currentUpperPawsKey = BeaverUpperPaws[config.upperPaws].slice(
                BeaverUpperPaws[config.upperPaws].lastIndexOf('_'),
                BeaverUpperPaws[config.upperPaws].length
            )

            setConfig((prevConfig) => ({
                ...prevConfig,
                // @ts-ignore
                upperPaws: BeaverUpperPaws[bodyColorKey + currentUpperPawsKey]
            }))
            const upperPawsObject = upperPaws.find(
                // @ts-ignore
                (paw) => paw.id === BeaverUpperPaws[bodyColorKey + currentUpperPawsKey]
            )
            if (typeof upperPawsObject !== 'undefined') {
                setPreviewLayers((prevLayers) => ({
                    ...prevLayers,
                    upperPaws: upperPawsObject.imageSrc
                }))
            }
        }

        /** Set actual array of upper paws */
        switch (bodyColor) {
            case BeaverBody.DEFAULT:
                setUpperPaws(defaultUpperPaws)
                break
            case BeaverBody.LIGHT_ORANGE:
                setUpperPaws(lightOrangeUpperPaws)
                break
            case BeaverBody.BROWN:
                setUpperPaws(brownUpperPaws)
                break
            case BeaverBody.BLUE:
                setUpperPaws(blueUpperPaws)
                break
            case BeaverBody.VIOLET:
                setUpperPaws(violetUpperPaws)
                break
        }
        changeCurrentUpperPaws(bodyColor)
    }, [bodyColor, config.upperPaws, upperPaws])

    const createBeaverImage = (): void => {
        openPreloader()
        const previewElement = document.querySelector('.beaver-preview-image')
        const modal = document.querySelector('.modal__beaver-preview')

        if (modal && previewElement) {
            modal.innerHTML = ''
            modal.prepend(previewElement.cloneNode(true))
        }

        openModal('configurator-save-modal')
        closePreloader()
    }

    const saveBeaverImage = async (): Promise<void> => {
        openPreloader()

        const beaverService = new BeaverService()
        const userService = new UserService()
        const user = userService.getFromLocalStorage()

        if (user) {
            beaverService.create({
                owner_user_id: user.user_id,
                config: previewLayers,
            })
                .then((beaver) => {
                    if (beaver) {
                        closePreloader()
                        navigate('/after-configurator')
                    }
                })
        }
    }

    const swipe = (next: boolean): void => {
        for (let i = 0; i < beaverConfigTabs.length; i++) {
            /** Find current tab */
            if (beaverConfigTabs[i].id === activeTab) {
                if (next) {
                    if (beaverConfigTabs.length !== i + 1) {
                        setActiveTab(beaverConfigTabs[i + 1].id)
                        smoothScrollTo('scroll-tab__item-' + beaverConfigTabs[i + 1].id)
                    }
                } else {
                    if (i !== 0) {
                        setActiveTab(beaverConfigTabs[i - 1].id)
                        smoothScrollTo('scroll-tab__item-' + beaverConfigTabs[i - 1].id)
                    }
                }
            }
        }
    }

    const smoothScrollTo = (id: string): void => {
        const elem = document.getElementById(id)
        if (elem) {
            setTimeout(
                () => elem.scrollIntoView({ behavior: 'smooth' }),
                100
            )
        }
    }

    const clickHandler = (event: React.MouseEvent<HTMLDivElement>): void => {
        const target = event.target as HTMLElement
        if (target.localName === 'button') return
        swipe(window.innerWidth / 2 <= event.clientX)
    }

    const [touchStartX, setTouchStartX] = useState<number>(0)

    const touchStartHandler = (event: React.TouchEvent<HTMLDivElement>): void => {
        setTouchStartX(event.touches[0].clientX)
    }

    const swipeHandler = (event: React.TouchEvent<HTMLDivElement>): void => {
        if (event.changedTouches[0].clientX === touchStartX) return
        swipe(event.changedTouches[0].clientX < touchStartX)
    }

    const setRandomConfig = (): void => {
        const getRandomInt = (max: number) => Math.floor(Math.random() * max)

        for (const configKey in config) {
            const tab = beaverConfigTabs.find((tab) => tab.id === configKey)
            if (typeof tab !== 'undefined') {
                const randomCard = tab.cards[getRandomInt(tab.cards.length)]
                setConfig((prevConfig) => ({
                    ...prevConfig,
                    [configKey]: randomCard.id
                }))
                setPreviewLayers((prevLayers) => ({
                    ...prevLayers,
                    [configKey]: randomCard.imageSrc
                }))
            }
        }
    }

    const resetConfigurator = (): void => {
        setConfig(initialConfig)
        setPreviewLayers(initialPreviewLayers)
    }

    const configIsInitial = (): boolean => {
        const layers = beaverConfigTabs.map((tab) => tab.id)

        for (const layer of layers) {
            if (config[layer] !== initialConfig[layer]) {
                return false
            }
        }

        return true
    }

    return (
        <div className={'configurator'}>
            <div className={'configurator-header'}>
                {
                    configIsInitial() ?
                        <button className={'configurator-header__prev-button font-secondary'}
                                onClick={ () => { navigate(-2) } }>
                            Back
                        </button>
                        :
                        <button className={'beaver-preview__reset-button font-secondary'}
                                onClick={ resetConfigurator }>
                            Reset
                        </button>
                }
            </div>

            <div className={'beaver-preview'} onClick={ clickHandler }
                 onTouchStart={ touchStartHandler } onTouchEnd={ swipeHandler }>
                <div className={'beaver-preview__background-gradient'}></div>

                <div className={'beaver-preview-image'}>
                    <img src={'./images/layers/Shadow.png'} className={'preview__shadow'} alt={'layer'} />

                    <img src={previewLayers.body} className={'preview__body'} alt={'layer'} />
                    <img src={previewLayers.head} className={'preview__head'} alt={'layer'} />
                    <img src={previewLayers.eyes} className={'preview__eyes'} alt={'layer'} />
                    <img src={previewLayers.mouth} className={'preview__mouth'} alt={'layer'} />
                    <img src={previewLayers.upperPaws} className={'preview__upperPaws'} alt={'layer'} />
                    <img src={previewLayers.lowerPaws} className={'preview__lowerPaws'} alt={'layer'} />
                    <img src={previewLayers.tail} className={'preview__tail'} alt={'layer'} />
                </div>

                <div className={'beaver-preview__buttons'}>
                    <button className={'beaver-preview__random-button font-secondary'}
                            onClick={ setRandomConfig }>
                        Random Beaver
                    </button>
                    <button className={'configurator-header__next-button font-secondary'}
                            onClick={ createBeaverImage }>
                        Next
                    </button>
                </div>
            </div>

            <div className={'configurator-tabs'}>
                <div className={'configurator-props__scroll-tab'}>
                    {
                        beaverConfigTabs.map(
                            (item) =>
                                <button key={ item.id }
                                        id={ 'scroll-tab__item-' + item.id }
                                        onClick={ (event) => {
                                            setActiveTab(item.id)
                                            event.currentTarget.scrollIntoView({ behavior: 'smooth' })
                                        } }
                                        className={ item.id === activeTab ? 'scroll-tab__item scroll-tab__item_active' : 'scroll-tab__item' }>
                                    { item.label }
                                </button>
                        )
                    }
                </div>
                <div className={'configurator-props__layer-tabs'}>
                    {
                        beaverConfigTabs.map(
                            (tab) =>
                                <div key={tab.id} className={ tab.id === activeTab ? 'layer-tab layer-tab_active' : 'layer-tab' }>
                                    {
                                        tab.id === 'upperPaws' ?
                                            upperPaws.map(
                                                (card) =>
                                                    <div key={card.id} className={'layer-tab__item layer-tab__item-' + tab.id}
                                                         onClick={ () => {
                                                             setConfig((prevConfig) => ({
                                                                 ...prevConfig,
                                                                 [tab.id]: card.id
                                                             }))
                                                             setPreviewLayers((prevLayers) => ({
                                                                 ...prevLayers,
                                                                 [tab.id]: card.imageSrc
                                                             }))
                                                         } }>
                                                        <img src={card.imageSrc} alt={String(card.id)} />
                                                    </div>
                                            )
                                            :
                                        tab.cards.map(
                                            (card) =>
                                                <div key={card.id} className={'layer-tab__item layer-tab__item-' + tab.id}
                                                     onClick={ () => {
                                                         setConfig((prevConfig) => ({
                                                             ...prevConfig,
                                                             [tab.id]: card.id
                                                         }))
                                                         setPreviewLayers((prevLayers) => ({
                                                             ...prevLayers,
                                                             [tab.id]: card.imageSrc
                                                         }))
                                                     } }>
                                                    <img src={card.imageSrc} alt={String(card.id)} />
                                                </div>
                                        )
                                    }
                                </div>
                        )
                    }
                </div>
            </div>
        
            <Modal id={'configurator-save-modal'}>
                <div className={'modal__beaver-preview'}></div>

                <PrimaryButton label={'Save'} onClick={ saveBeaverImage } />
                <SecondaryButton label={'Try again'} onClick={ closeModal } />
            </Modal>
        </div>
    )
}

export default Configurator