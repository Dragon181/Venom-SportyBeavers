import {SportyApi} from "../sporty-api.service";
import {ILootbox} from "./interfaces/lootbox.interface";
import {UserService} from "../user/user.service";
import {Address, ProviderRpcClient} from "everscale-inpage-provider";
import * as nftAbi from "../beaver/interfaces/nft.abi.json";
import {closePreloader, openPreloader} from "../../../ui-kit/preloader/Preloader";
import {openModal} from "../../../components/modal/Modal";

export class LootboxService {
	private readonly userService = new UserService()

	emptyLootbox: ILootbox = {
		beav_count: 50,
		beaver_image_src: "",
		beaver_rarity: "",
		cost: 15,
		is_nft: false,
		is_open: false,
		lootbox_id: "abcdef",
		nft_chance: 0,
		owner_user_id: ""
	}

	async findAll(): Promise<ILootbox[]> {
		const api = new SportyApi<ILootbox[]>()
		return api.request({
			method: 'GET',
			path: 'lootbox/all'
		})
	}

	async findOne(id: string): Promise<ILootbox> {
		const api = new SportyApi<ILootbox>()
		return api.request({
			method: 'GET',
			path: 'lootbox/' + id,
		})
	}

	async buyLootbox(lootbox: ILootbox): Promise<void> {
		openPreloader()
		const user = this.userService.getFromLocalStorage()
		const initConnect = await this.userService.initVenomConnect()
		const provider: ProviderRpcClient = await initConnect.checkAuth()

		if (provider && provider.isInitialized) {
			const transfer = await provider.sendMessage({
				amount: String(1000000000 * lootbox.cost),
				recipient: new Address('0:9080ef4369fd6becd3a0f6133bd54bb29f5f3921108343a0acb11c414c3e94f8'),
				sender: new Address(user.wallet),
				bounce: false
			})

			if (transfer) {
				closePreloader()
			} else {
				openModal('error-modal')
			}
		}
	}

	async open(lootbox: ILootbox): Promise<boolean> {
		const api = new SportyApi<boolean>()
		const user = this.userService.getFromLocalStorage()
		return api.request({
			method: 'PUT',
			path: 'lootbox/open',
			params: {
				lootbox_id: lootbox.lootbox_id,
				user_id: user.user_id,
			},
		})
	}
}