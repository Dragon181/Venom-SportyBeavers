import {
    BeaverBody,
    BeaverEyes,
    BeaverHead,
    BeaverLowerPaws,
    BeaverMouth,
    BeaverTail,
    BeaverUpperPaws,
} from './beaver-config.interface'

export type BeaverLayerLabel = 'Body' | 'Head' | 'Eyes' | 'Mouth' | 'Upper paws' | 'Feet' | 'Tail'
export type BeaverLayerId = 'body' | 'head' | 'eyes' | 'mouth' | 'upperPaws' | 'lowerPaws' | 'tail'

export type BeaverLayerElementId = BeaverBody | BeaverHead | BeaverEyes | BeaverMouth | BeaverUpperPaws | BeaverLowerPaws | BeaverTail

export interface IBeaverConfigTab {
    readonly label: BeaverLayerLabel
    readonly id: BeaverLayerId
    readonly cards: IBeaverConfigCard[]
}

export interface IBeaverConfigCard {
    readonly id: BeaverLayerElementId
    readonly imageSrc: string
}