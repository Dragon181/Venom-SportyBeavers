export interface INft {
	readonly type: 'SportyBeavers NFT'
	readonly name: 'SportyBeaver in Venom'
	readonly description: 'Sporty Beaver is an extremely cute NFT character of Sporty Beavers Move-2-Earn game. Owning Sporty Beaver can give opportunity to play AR-games and compete with other beavers.'
	readonly preview: {
		readonly source: string
		readonly mimetype: 'image/png'
	}
	readonly files: {
		readonly source: string
		readonly mimetype: 'image/png'
	}[]
	readonly external_url: 'https://sportybeavers.com'
	readonly attributes?: {
		readonly trait_type: string
		readonly value: string
	}[]
}