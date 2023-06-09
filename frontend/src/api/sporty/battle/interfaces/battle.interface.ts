import { IBeaverOnBattle } from './beaver-on-battle.interface'

export interface IBattle {
    readonly battle_id: string
    readonly opponents: {
        readonly first_beaver: IBeaverOnBattle
        readonly second_beaver: IBeaverOnBattle
    }
}