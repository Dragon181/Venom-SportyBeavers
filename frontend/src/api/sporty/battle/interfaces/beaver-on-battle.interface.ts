import {Beaver} from "../../beaver/interfaces/beaver.interface";

export interface IBeaverOnBattle extends Beaver {
	readonly moral: number
}
