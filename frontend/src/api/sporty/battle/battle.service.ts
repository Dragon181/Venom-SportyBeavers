import { SportyApi } from '../sporty-api.service'
import { IBattle } from './interfaces/battle.interface'
import { BeaverService } from '../beaver/beaver.service'
import { UserService } from '../user/user.service'

export class BattleService {
    private readonly userService = new UserService()
    private readonly beaverService = new BeaverService()

    private readonly battleObjectKey = 'SportyBeavers__battle'

    private readonly emptyBattle: IBattle = {
        battle_id: 'random_uuid',
        opponents: {
            first_beaver: {
                ...this.beaverService.getEmptyBeaver(),
                moral: 0
            },
            second_beaver: {
                ...this.beaverService.getEmptyBeaver(),
                moral: 0
            },
        }
    }

    async getBattle(beaver_id: string): Promise<IBattle> {
        const api = new SportyApi<IBattle>()
        const battle = await api.request({
            method: 'POST',
            path: 'battle/' + beaver_id,
        })

        if (battle && typeof battle !== 'undefined') {
            this.setBattleInLocalStorage(battle)
            return battle
        } else {
            return this.emptyBattle
        }
    }

    async step(step_value: number): Promise<number> {
        const battle = this.getBattleFromLocalStorage()
        const api = new SportyApi<number>()

        const opponentStep = await api.request({
            method: 'PUT',
            path: 'battle/' + battle.battle_id + '/step/' + step_value
        })

        if (opponentStep && typeof opponentStep !== 'undefined') {
            return opponentStep
        } else {
            return 0
        }
    }

    async saveBattleResult(result: 0 | 1 | 2): Promise<void> {
        const battle = this.getBattleFromLocalStorage()
        const api = new SportyApi<void>()
        await api.request({
            method: 'PUT',
            path: 'battle/' + battle.battle_id + '/result/' + result,
        })
        await this.userService.refreshUser()
    }

    getBattleFromLocalStorage(): IBattle {
        const battleObjectString = localStorage.getItem(this.battleObjectKey)
        return battleObjectString ? JSON.parse(battleObjectString) : null
    }

    setBattleInLocalStorage(battle: IBattle): void {
        localStorage.setItem(this.battleObjectKey, JSON.stringify(battle))
    }
}