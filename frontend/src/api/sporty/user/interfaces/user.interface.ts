import { Beaver } from '../../beaver/interfaces/beaver.interface'

export interface User {
    readonly user_id: string
    readonly wallet: string
    readonly beav: number
    readonly last_time_log_in: Date
    readonly beavers: Beaver[]
    readonly moral: number
}