export interface Beaver {
    readonly beaver_id: string
    readonly owner_user_id: string

    readonly energy: number
    readonly max_energy: number

    readonly picture_url: string

    readonly strength: number
    readonly agility: number
    readonly endurance: number

    readonly level: number
    readonly rarity: string
    readonly is_nft: boolean
    readonly name: string

    readonly attributes: number[]
}