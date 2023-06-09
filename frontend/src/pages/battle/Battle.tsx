import React, { useEffect, useState } from 'react'
import './Battle.css'
import './BattleMoves.css'
import Heading from '../../ui-kit/heading/Heading'
import Opponents from '../../components/opponents/Opponents'
import { BattleMoveItemState } from '../../components/battle-moves/BattleMoves'
import BattleProperties from '../../components/battle-properties/BattleProperties'
import { BattleService } from '../../api/sporty/battle/battle.service'
import { useNavigate } from 'react-router-dom'
import { Howl } from 'howler'

interface IBattleState {
    readonly status: boolean
    readonly yourHealth: number
    readonly opponentHealth: number
}


export type MoveItemClassName = '' | 'battle-moves__user' | 'battle-moves__opponent' | 'battle-moves__both'

export interface IMoveClasses {
    readonly strength: MoveItemClassName
    readonly agility: MoveItemClassName
    readonly endurance: MoveItemClassName
}

const getMoveItemClassName = (itemState: BattleMoveItemState): MoveItemClassName => {
    switch (itemState) {
        case BattleMoveItemState.EMPTY:
            return ''
        case BattleMoveItemState.USER:
            return 'battle-moves__user'
        case BattleMoveItemState.OPPONENT:
            return 'battle-moves__opponent'
        case BattleMoveItemState.BOTH:
            return 'battle-moves__both'
    }
}

const movesArray = ['strength', 'agility', 'endurance']

const Battle = () => {
    const battleService = new BattleService()
    const battle = battleService.getBattleFromLocalStorage()

    const battleInitialState = {
        status: true,
        yourHealth: battle.opponents.first_beaver.strength +
            battle.opponents.first_beaver.agility +
            battle.opponents.first_beaver.endurance +
            battle.opponents.first_beaver.moral,
        opponentHealth: battle.opponents.second_beaver.strength +
            battle.opponents.second_beaver.agility +
            battle.opponents.second_beaver.endurance +
            battle.opponents.second_beaver.moral,
    }

    const navigate = useNavigate()

    const [battleState, setBattleState] = useState<IBattleState>(battleInitialState)

    const [timerActive, setTimerActive] = useState<boolean>(true)

    const [timeCount, setTimeCount] = useState<number>(15)

    const [movesDisabled, setMovesDisabled] = useState<boolean>(false)

    const [moveItemClasses, setMoveItemClasses] = useState<IMoveClasses>({
        strength: getMoveItemClassName(BattleMoveItemState.EMPTY),
        agility: getMoveItemClassName(BattleMoveItemState.EMPTY),
        endurance: getMoveItemClassName(BattleMoveItemState.EMPTY),
    })

    const setUserChoice = (target: string): void => {
        setMoveItemClasses((prevState) => ({
            ...prevState,
            [target]: getMoveItemClassName(BattleMoveItemState.USER),
        }))
    }

    const setOpponentChoice = (
        userChoice: number,
        opponentChoice: number,
        timeout: number
    ): void => {
        setTimeout(() => {
            setMoveItemClasses((prevState) => ({
                ...prevState,
                [movesArray[opponentChoice]]: userChoice === opponentChoice ?
                    getMoveItemClassName(BattleMoveItemState.BOTH) :
                    getMoveItemClassName(BattleMoveItemState.OPPONENT),
            }))
        }, timeout)
    }

    const changeHealth = (
        userChoice: number,
        opponentChoice: number,
        timeout: number
    ): void => {
        setTimeout(() => {
            if (userChoice === opponentChoice) {
                if (battle.opponents.first_beaver.moral > battle.opponents.second_beaver.moral) {
                    switch (userChoice) {
                        case 0:
                            setBattleState((prevState) => ({
                                ...prevState,
                                opponentHealth: prevState.opponentHealth - battle.opponents.first_beaver.strength
                            }))
                            break
                        case 1:
                            setBattleState((prevState) => ({
                                ...prevState,
                                opponentHealth: prevState.opponentHealth - battle.opponents.first_beaver.agility
                            }))
                            break
                        case 2:
                            setBattleState((prevState) => ({
                                ...prevState,
                                opponentHealth: prevState.opponentHealth - battle.opponents.first_beaver.endurance
                            }))
                            break
                    }
                    successSound.play()
                } else if (battle.opponents.first_beaver.moral < battle.opponents.second_beaver.moral) {
                    switch (opponentChoice) {
                        case 0:
                            setBattleState((prevState) => ({
                                ...prevState,
                                yourHealth: prevState.yourHealth - battle.opponents.second_beaver.strength
                            }))
                            break
                        case 1:
                            setBattleState((prevState) => ({
                                ...prevState,
                                yourHealth: prevState.yourHealth - battle.opponents.second_beaver.agility
                            }))
                            break
                        case 2:
                            setBattleState((prevState) => ({
                                ...prevState,
                                yourHealth: prevState.yourHealth - battle.opponents.second_beaver.endurance
                            }))
                            break
                    }
                    failureDrumSound.play()
                }
            } else {
                switch (userChoice) {
                    case 0:
                        if (opponentChoice === 1) {
                            setBattleState((prevState) => ({
                                ...prevState,
                                opponentHealth: prevState.opponentHealth - battle.opponents.first_beaver.strength
                            }))
                            successSound.play()
                        } else if (opponentChoice === 2) {
                            setBattleState((prevState) => ({
                                ...prevState,
                                yourHealth: prevState.yourHealth - battle.opponents.second_beaver.endurance
                            }))
                            failureDrumSound.play()
                        }
                        break
                    case 1:
                        if (opponentChoice === 0) {
                            setBattleState((prevState) => ({
                                ...prevState,
                                yourHealth: prevState.yourHealth - battle.opponents.second_beaver.strength
                            }))
                            failureDrumSound.play()
                        } else if (opponentChoice === 2) {
                            setBattleState((prevState) => ({
                                ...prevState,
                                opponentHealth: prevState.opponentHealth - battle.opponents.first_beaver.agility
                            }))
                            successSound.play()
                        }
                        break
                    case 2:
                        if (opponentChoice === 0) {
                            setBattleState((prevState) => ({
                                ...prevState,
                                opponentHealth: prevState.opponentHealth - battle.opponents.first_beaver.endurance
                            }))
                            successSound.play()
                        } else if (opponentChoice === 1) {
                            setBattleState((prevState) => ({
                                ...prevState,
                                yourHealth: prevState.yourHealth - battle.opponents.second_beaver.agility
                            }))
                            failureDrumSound.play()
                        }
                        break
                }
            }
        }, timeout)
    }

    const resetState = (timeout: number): void => {
        setTimeout(() => {
            setMoveItemClasses({
                strength: getMoveItemClassName(BattleMoveItemState.EMPTY),
                agility: getMoveItemClassName(BattleMoveItemState.EMPTY),
                endurance: getMoveItemClassName(BattleMoveItemState.EMPTY),
            })
            setMovesDisabled(false)
        }, timeout + 2000)
    }

    const hitSound = new Howl({ src: ['../audio/hit-sound-effect.mp3'] })
    const successSound = new Howl({ src: ['../audio/success-battle.mp3'] })
    const failureDrumSound = new Howl({ src: ['../audio/failure-drum-sound.mp3'] })
    // const timerSound = new Howl({ src: ['../audio/15-sec-timer.mp3'] })
    // const tickerTimerSound = new Howl({ src: ['../audio/ticking-timer.mp3'] })
    const soundtrack = new Howl({
        src: ['../audio/battle-soundtrack-loop.mp3'],
        loop: true,
        volume: 0.5,
    })

    const step = (event: React.MouseEvent<HTMLButtonElement>): void => {
        if (movesDisabled) return

        hitSound.play()

        setMovesDisabled(true)
        stopTimer()

        const targetKey = event.currentTarget.id

        const userChoice = movesArray.findIndex((move) => move === targetKey)

        setUserChoice(targetKey)
        battleService.step(userChoice)
            .then((opponentChoice) => {
                const fakeTimeout = Math.floor(Math.random() * 3000)
                setOpponentChoice(userChoice, opponentChoice, fakeTimeout)
                changeHealth(userChoice, opponentChoice, fakeTimeout)
                resetState(fakeTimeout)
            })
    }

    const stopTimer = (): void => {
        setTimeCount(15)
        setTimerActive(false)
    }

    /** Start soundtrack */
    useEffect(() => {
        soundtrack.play()
        soundtrack.fade(0.5, 0.1, 50)
    }, [])

    /** Show / start timer */
    useEffect(() => {
        if (!movesDisabled) {
            setTimeCount(15)
            setTimerActive(true)
        }
    }, [movesDisabled])

    /** Set timer interval */
    useEffect(() => {
        setInterval(() => {
            setTimeCount((prevTime) => prevTime - 1)
        }, 1000)
    }, [])

    /** Technical lose after 15 seconds */
    useEffect(() => {
        if (timeCount === 0) {
            setTimeout(() => {
                Howler.stop()
                navigate('/game-lose')
            }, 500)
        }
    }, [timeCount, navigate])

    /** Battle results handler */
    useEffect(() => {
        const nav2gameResult = (result: 'win' | 'lose' | 'draw'): void => {
            Howler.stop()
            setTimeout(() => {
                navigate('/game-' + result)
            }, 1500)
        }

        if (battleState.yourHealth <= 0) {
            battleService.saveBattleResult(1)
                .then(() => nav2gameResult('lose'))
        } else if (battleState.opponentHealth <= 0) {
            battleService.saveBattleResult(0)
                .then(() => nav2gameResult('win'))
        } else if (battleState.yourHealth <= 0 && battleState.opponentHealth <= 0) {
            battleService.saveBattleResult(2)
                .then(() => nav2gameResult('draw'))
        }
    }, [battleState.opponentHealth, battleState.yourHealth, navigate])

    const timerClassName = timerActive ? 'battle__timer battle__timer_active' : 'battle__timer'

    return (
        <div className={'battle'}>
            <div className={'battle__header'}>
                <Heading text={'Battle'} />
                {/*<OptionButton onClick={ () => {} } />*/}
            </div>

            <div className={ timerClassName }>
                <p className={'font-secondary'}>Your move</p>
                <div className={'battle__timer-seconds'}>
                    <div className={'battle__timer-spinner'}></div>
                    <span className={'font-secondary'}>{ timeCount }</span>
                </div>
            </div>

            <Opponents userImageSrc={battle.opponents.first_beaver.picture_url}
                       oppImageSrc={battle.opponents.second_beaver.picture_url} />

            <div className={'battle__points'}>
                <BattleProperties maxHealth={battleInitialState.yourHealth}
                                  health={battleState.yourHealth}
                                  strength={battle.opponents.first_beaver.strength}
                                  agility={battle.opponents.first_beaver.agility}
                                  endurance={battle.opponents.first_beaver.endurance}
                                  moral={battle.opponents.first_beaver.moral}
                                  isUser={true} movesDisabled={movesDisabled}
                                  moveItemClasses={moveItemClasses} />
                <BattleProperties maxHealth={battleInitialState.opponentHealth}
                                  health={battleState.opponentHealth}
                                  strength={battle.opponents.second_beaver.strength}
                                  agility={battle.opponents.second_beaver.agility}
                                  endurance={battle.opponents.second_beaver.endurance}
                                  moral={battle.opponents.second_beaver.moral}
                                  isUser={false} movesDisabled={movesDisabled}
                                  moveItemClasses={moveItemClasses} />
            </div>

            <div className={'battle-moves'}>
                <div className={'battle-moves__background-blur'}></div>
                <div className={'battle-moves__background-gradient'}></div>

                <div className={'battle-moves__buttons'}>
                    <button id={'strength'} onClick={ step }
                            className={'battle-moves__strength ' + moveItemClasses.strength}>
                        <div></div>
                    </button>
                    <button id={'agility'} onClick={ step }
                            className={'battle-moves__agility ' + moveItemClasses.agility}>
                        <div></div>
                    </button>
                    <button id={'endurance'} onClick={ step }
                            className={'battle-moves__endurance ' + moveItemClasses.endurance}>
                        <div></div>
                    </button>

                    <BattleMovesArrows />
                </div>
            </div>
        </div>
    )
}

const BattleMovesArrows = () => {
    return (
        <>
            <div className={'battle-moves__arrow battle-moves__arrow-1'}></div>
            <div className={'battle-moves__arrow battle-moves__arrow-2'}></div>
            <div className={'battle-moves__arrow battle-moves__arrow-3'}></div>

            <span className={'battle-moves__arrow-label font-secondary battle-moves__arrow-label-1'}>beats</span>
            <span className={'battle-moves__arrow-label font-secondary battle-moves__arrow-label-2'}>beats</span>
            <span className={'battle-moves__arrow-label font-secondary battle-moves__arrow-label-3'}>beats</span>
        </>
    )
}

export default Battle