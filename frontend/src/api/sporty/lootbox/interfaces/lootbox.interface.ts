export interface ILootbox {
	readonly lootbox_id: string
	readonly owner_user_id: string
	readonly beaver_image_src: string
	readonly beaver_rarity: string

	readonly cost: number
	readonly nft_chance: number
	readonly beav_count: number

	readonly is_open: boolean
	readonly is_nft: boolean
}
