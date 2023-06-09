import { SportyApi } from '../sporty-api.service'
import { Beaver } from './interfaces/beaver.interface'
import { ICreateBeaver } from './interfaces/create-beaver.interface'
import { UserService } from '../user/user.service'
import {Address, ProviderRpcClient} from "everscale-inpage-provider";
import * as nftAbi from "./interfaces/nft.abi.json";
import {INft} from "./interfaces/nft.interface";

export class BeaverService {
    private readonly contractAddress = new Address('0:6a819d33ef0fcbf31efba867e6d3d4f8672b4fdbed9771e4d63b01851cad52ff')

    private readonly api = new SportyApi<Beaver>()
    private readonly userService = new UserService()
    private readonly emptyBeaver = {
        name: 'Beaver #1',
        strength: 0,
        agility: 0,
        endurance: 0,
        rarity: 'Common',
        beaver_id: '',
        energy: 0,
        is_nft: false,
        level: 1,
        max_energy: 0,
        owner_user_id: '',
        picture_url: 'https://sportybeavers-vk.hb.bizmrg.com/public/beaver_basic.png',
        attributes: []
    }

    readonly activeBeaverObjectKey = 'SportyBeavers__active-beaver'

    async create(createBeaverDto: ICreateBeaver): Promise<Beaver> {
        const beaver = await this.api.request({
            method: 'POST',
            path: 'beaver/create',
            data: createBeaverDto,
        })

        const user = this.userService.getFromLocalStorage()
        if (user && beaver) user.beavers.push(beaver)

        this.userService.setInLocalStorage(user)
        this.setActiveBeaverInLocalStorage(beaver)

        return beaver
    }

    async findOne(beaver_id: string): Promise<Beaver> {
        return this.api.request({
            method: 'GET',
            path: 'beaver/' + beaver_id,
        })
    }

    async levelUp(beaver_id: string): Promise<void> {
        this.setActiveBeaverInLocalStorage(await this.api.request({
            method: 'GET',
            path: 'beaver/' + beaver_id + '/level-up'
        }))
    }

    async makeBeaverNft(beaver_id: string): Promise<void> {
        this.setActiveBeaverInLocalStorage(await this.api.request({
            method: 'GET',
            path: 'beaver/' + beaver_id + '/make-nft'
        }))
    }

    async mint(beaver: Beaver): Promise<void> {
        const user = this.userService.getFromLocalStorage()

        const initConnect = await this.userService.initVenomConnect()
        const provider: ProviderRpcClient = await initConnect.checkAuth()

        if (provider && provider.isInitialized) {
            const contract = new provider.Contract(nftAbi, this.contractAddress)
            const result = (await contract.methods
                    .mint({
                        json: JSON.stringify(
                            this.getNftPayload(beaver.picture_url)
                        )
                    } as never)
                    .send({
                        amount: '1000000000',
                        from: user.wallet
                    } as never)
            ) as any

            if (result) {
                await this.makeBeaverNft(beaver.beaver_id)
            }
        }
    }

    getNftPayload(beaverImageSrc: string): INft {
        return {
            type: "SportyBeavers NFT",
            name: "SportyBeaver in Venom",
            description: "Sporty Beaver is an extremely cute NFT character of Sporty Beavers Move-2-Earn game. Owning Sporty Beaver can give opportunity to play AR-games and compete with other beavers.",
            external_url: "https://sportybeavers.com",
            preview: {
                source: beaverImageSrc,
                mimetype: "image/png"
            },
            files: [
                {
                    source: beaverImageSrc,
                    mimetype: "image/png"
                }
            ]
        }
    }

    setActiveBeaverInLocalStorage(
        beaver: Beaver
    ): void {
        if (typeof beaver === 'undefined') {
            localStorage.setItem(this.activeBeaverObjectKey, JSON.stringify(null))
        }
        localStorage.setItem(this.activeBeaverObjectKey, JSON.stringify(beaver))
    }

    getActiveBeaverFromLocalStorage(): Beaver {
        const beaver = localStorage.getItem(this.activeBeaverObjectKey)
        if (typeof beaver !== 'undefined' && beaver) {
            return JSON.parse(beaver)
        } else {
            return this.emptyBeaver
        }
    }

    getLevelUpCost(currentLevel: number): number {
        const costArray: number[] = [10, 30, 80, 150, 250]
        if (currentLevel <= 5) {
            return costArray[currentLevel - 1]
        } else {
            return costArray[costArray.length - 1]
        }
    }

    getWinGain(currentLevel: number): number {
        const gainArray: number[] = [1, 2, 4, 10]
        if (currentLevel <= 4) {
            return gainArray[currentLevel - 1]
        } else {
            return gainArray[gainArray.length - 1]
        }
    }

    getEmptyBeaver(): Beaver {
        return this.emptyBeaver
    }

    static translateBeaverRarity(rarity: string): string {
        switch (rarity) {
            case 'common':
            default:
                return 'Common'
            case 'uncommon':
                return 'Uncommon'
            case 'rare':
                return 'Rare'
            case 'legendary':
                return 'Legendary'
        }
    }
}