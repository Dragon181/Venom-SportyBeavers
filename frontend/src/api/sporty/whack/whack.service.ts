import {SportyApi} from "../sporty-api.service"
import {BeaverService} from "../beaver/beaver.service";

export class WhackService {
	private readonly api = new SportyApi()
	private readonly beaverService = new BeaverService()

	async sendResult(
		success_touches: number,
		all_touches: number
	): Promise<void> {
		const beaver = this.beaverService.getActiveBeaverFromLocalStorage()
		await this.api.request({
			method: 'POST',
			path: 'whack',
			params: {
				beaver_id: beaver.beaver_id,
				successful_touches: success_touches,
				all_touches: all_touches,
			}
		})
	}
}