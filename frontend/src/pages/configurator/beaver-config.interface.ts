export enum BeaverBody {
    DEFAULT = 100,
    LIGHT_ORANGE,
    BROWN,
    BLUE,
    VIOLET,
}

export enum BeaverHead {
    DEFAULT = 200,
    BANDAGE,
    HAT,
    HELMET,
    WOMAN_HAIR,
}

export enum BeaverEyes {
    DEFAULT = 300,
    SQUINT,
    GLASSES,
    WOMAN,
    SILLY,
    BROWS,
}

export enum BeaverMouth {
    DEFAULT = 400,
    TEETH,
    MUSTACHES,
    BUBBLEGUM,
    CHIN,
}

export enum BeaverUpperPaws {
    DEFAULT_DEFAULT = 500,
    DEFAULT_PHONE,
    DEFAULT_DUMBBELLS,
    DEFAULT_LOLLIPOP,
    LIGHT_ORANGE_DEFAULT,
    LIGHT_ORANGE_PHONE,
    LIGHT_ORANGE_DUMBBELLS,
    LIGHT_ORANGE_LOLLIPOP,
    BROWN_DEFAULT,
    BROWN_PHONE,
    BROWN_DUMBBELLS,
    BROWN_LOLLIPOP,
    BLUE_DEFAULT,
    BLUE_PHONE,
    BLUE_DUMBBELLS,
    BLUE_LOLLIPOP,
    VIOLET_DEFAULT,
    VIOLET_PHONE,
    VIOLET_DUMBBELLS,
    VIOLET_LOLLIPOP,
}

export enum BeaverLowerPaws {
    DEFAULT = 600,
    SHOES,
    YEEZY,
    RED_SHOES,
}

export enum BeaverTail {
    DEFAULT = 700,
    ZEBRA,
    BITE,
    ELASTIC,
    RING,
}

export interface IBeaverConfig {
    readonly body: BeaverBody
    readonly head: BeaverHead
    readonly eyes: BeaverEyes
    readonly mouth: BeaverMouth
    readonly upperPaws: BeaverUpperPaws
    readonly lowerPaws: BeaverLowerPaws
    readonly tail: BeaverTail
}

export interface IPreviewImages {
    readonly body: string
    readonly head: string
    readonly eyes: string
    readonly mouth: string
    readonly upperPaws: string
    readonly lowerPaws: string
    readonly tail: string
}
