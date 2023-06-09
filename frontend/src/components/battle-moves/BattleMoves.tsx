import React, { FC, useState } from 'react'
import './BattleMoves.css'

export enum BattleMoveItemState {
    EMPTY = 'empty',
    USER = 'user',
    OPPONENT = 'opponent',
    BOTH = 'both',
}

export interface IBattleMoves {
    readonly sendStep: () => Promise<number>
    readonly disabled: boolean
    readonly strength: BattleMoveItemState
    readonly agility: BattleMoveItemState
    readonly endurance: BattleMoveItemState
}

type MoveItemClassName = '' | 'battle-moves__user' | 'battle-moves__opponent' | 'battle-moves__both'

interface IMoveClasses {
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

const BattleMoves: FC<IBattleMoves> = (moves) => {
    const [moveItemClasses, setMoveItemClasses] = useState<IMoveClasses>({
        strength: getMoveItemClassName(moves.strength),
        agility: getMoveItemClassName(moves.agility),
        endurance: getMoveItemClassName(moves.endurance),
    })

    return (
        <div className={'battle-moves'}>
            <div className={'battle-moves__background-blur'}></div>
            <div className={'battle-moves__background-gradient'}></div>

            <div className={'battle-moves__buttons'}>
                <button id={'strength'} onClick={ () => {} }
                        className={'battle-moves__strength ' + moveItemClasses.strength}>
                    <div></div>
                </button>
                <button id={'agility'} onClick={ () => {} }
                        className={'battle-moves__agility ' + moveItemClasses.agility}>
                    <div></div>
                </button>
                <button id={'endurance'} onClick={ () => {} }
                        className={'battle-moves__endurance ' + moveItemClasses.endurance}>
                    <div></div>
                </button>

                <BattleMovesArrows />
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

export default BattleMoves