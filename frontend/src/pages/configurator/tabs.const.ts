import { IBeaverConfigCard, IBeaverConfigTab } from './beaver-config-tab.interface'
import {
    BeaverBody,
    BeaverEyes,
    BeaverHead,
    BeaverLowerPaws,
    BeaverMouth, BeaverTail,
    BeaverUpperPaws,
} from './beaver-config.interface'

export const beaverConfigTabs: IBeaverConfigTab[] = [
    {
        id: 'body',
        label: 'Body',
        cards: [
            {
                id: BeaverBody.DEFAULT,
                imageSrc: './images/layers/Body_Default.png',
            },
            {
                id: BeaverBody.LIGHT_ORANGE,
                imageSrc: './images/layers/Body_LightOrange.png',
            },
            {
                id: BeaverBody.BROWN,
                imageSrc: './images/layers/Body_Brown.png',
            },
            {
                id: BeaverBody.BLUE,
                imageSrc: './images/layers/Body_Blue.png',
            },
            {
                id: BeaverBody.VIOLET,
                imageSrc: './images/layers/Body_Violet.png',
            },
        ],
    },
    {
        id: 'head',
        label: 'Head',
        cards: [
            {
                id: BeaverHead.DEFAULT,
                imageSrc: './images/layers/Head_Default.png'
            },
            {
                id: BeaverHead.BANDAGE,
                imageSrc: './images/layers/Head_Bandage.png'
            },
            {
                id: BeaverHead.HAT,
                imageSrc: './images/layers/Head_Hat.png'
            },
            {
                id: BeaverHead.HELMET,
                imageSrc: './images/layers/Head_Helmet.png'
            },
            {
                id: BeaverHead.WOMAN_HAIR,
                imageSrc: './images/layers/Head_WomanHair.png'
            },
        ],
    },
    {
        id: 'eyes',
        label: 'Eyes',
        cards: [
            {
                id: BeaverEyes.DEFAULT,
                imageSrc: './images/layers/Eyes_Default.png',
            },
            {
                id: BeaverEyes.SQUINT,
                imageSrc: './images/layers/Eyes_Squint.png',
            },
            {
                id: BeaverEyes.GLASSES,
                imageSrc: './images/layers/Eyes_Glasses.png',
            },
            {
                id: BeaverEyes.WOMAN,
                imageSrc: './images/layers/Eyes_Woman.png',
            },
            {
                id: BeaverEyes.SILLY,
                imageSrc: './images/layers/Eyes_Silly.png',
            },
            {
                id: BeaverEyes.BROWS,
                imageSrc: './images/layers/Eyes_Brows.png',
            },
        ],
    },
    {
        id: 'mouth',
        label: 'Mouth',
        cards: [
            {
                id: BeaverMouth.DEFAULT,
                imageSrc: './images/layers/Mouth_Default.png',
            },
            {
                id: BeaverMouth.TEETH,
                imageSrc: './images/layers/Mouth_Teeth.png',
            },
            {
                id: BeaverMouth.MUSTACHES,
                imageSrc: './images/layers/Mouth_Mustaches.png',
            },
            {
                id: BeaverMouth.BUBBLEGUM,
                imageSrc: './images/layers/Mouth_Bubblegum.png',
            },
            {
                id: BeaverMouth.CHIN,
                imageSrc: './images/layers/Mouth_Chin.png',
            },
        ],
    },
    {
        id: 'upperPaws',
        label: 'Upper paws',
        cards: [
            {
                id: BeaverUpperPaws.DEFAULT_DEFAULT,
                imageSrc: './images/layers/UpperPaws_Default.png',
            },
            {
                id: BeaverUpperPaws.DEFAULT_PHONE,
                imageSrc: './images/layers/UpperPaws_Phone.png',
            },
            {
                id: BeaverUpperPaws.DEFAULT_DUMBBELLS,
                imageSrc: './images/layers/UpperPaws_Dumbbells.png',
            },
            {
                id: BeaverUpperPaws.DEFAULT_LOLLIPOP,
                imageSrc: './images/layers/UpperPaws_Lollipop.png',
            },
        ],
    },
    {
        id: 'lowerPaws',
        label: 'Feet',
        cards: [
            {
                id: BeaverLowerPaws.DEFAULT,
                imageSrc: './images/layers/LowerPaws_Default.png',
            },
            {
                id: BeaverLowerPaws.SHOES,
                imageSrc: './images/layers/LowerPaws_Shoes.png',
            },
            {
                id: BeaverLowerPaws.YEEZY,
                imageSrc: './images/layers/LowerPaws_Yeezy.png',
            },
            {
                id: BeaverLowerPaws.RED_SHOES,
                imageSrc: './images/layers/LowerPaws_RedShoes.png',
            },
        ],
    },
    {
        id: 'tail',
        label: 'Tail',
        cards: [
            {
                id: BeaverTail.DEFAULT,
                imageSrc: './images/layers/Tail_Default.png',
            },
            {
                id: BeaverTail.ZEBRA,
                imageSrc: './images/layers/Tail_Zebra.png',
            },
            {
                id: BeaverTail.BITE,
                imageSrc: './images/layers/Tail_Bite.png',
            },
            {
                id: BeaverTail.ELASTIC,
                imageSrc: './images/layers/Tail_Elastic.png',
            },
            {
                id: BeaverTail.RING,
                imageSrc: './images/layers/Tail_Ring.png',
            },
        ],
    },
]

export const defaultUpperPaws: IBeaverConfigCard[] = [
    {
        id: BeaverUpperPaws.DEFAULT_DEFAULT,
        imageSrc: './images/layers/UpperPaws_Default.png',
    },
    {
        id: BeaverUpperPaws.DEFAULT_PHONE,
        imageSrc: './images/layers/UpperPaws_Phone.png',
    },
    {
        id: BeaverUpperPaws.DEFAULT_DUMBBELLS,
        imageSrc: './images/layers/UpperPaws_Dumbbells.png',
    },
    {
        id: BeaverUpperPaws.DEFAULT_LOLLIPOP,
        imageSrc: './images/layers/UpperPaws_Lollipop.png',
    },
]

export const lightOrangeUpperPaws: IBeaverConfigCard[] = [
    {
        id: BeaverUpperPaws.LIGHT_ORANGE_DEFAULT,
        imageSrc: './images/layers/LightOrange_UpperPaws_Default.png',
    },
    {
        id: BeaverUpperPaws.LIGHT_ORANGE_PHONE,
        imageSrc: './images/layers/LightOrange_UpperPaws_Phone.png',
    },
    {
        id: BeaverUpperPaws.LIGHT_ORANGE_DUMBBELLS,
        imageSrc: './images/layers/LightOrange_UpperPaws_Dumbbells.png',
    },
    {
        id: BeaverUpperPaws.LIGHT_ORANGE_LOLLIPOP,
        imageSrc: './images/layers/LightOrange_UpperPaws_Lollipop.png',
    },
]

export const brownUpperPaws: IBeaverConfigCard[] = [
    {
        id: BeaverUpperPaws.BROWN_DEFAULT,
        imageSrc: './images/layers/Brown_UpperPaws_Default.png',
    },
    {
        id: BeaverUpperPaws.BROWN_PHONE,
        imageSrc: './images/layers/Brown_UpperPaws_Phone.png',
    },
    {
        id: BeaverUpperPaws.BROWN_DUMBBELLS,
        imageSrc: './images/layers/Brown_UpperPaws_Dumbbells.png',
    },
    {
        id: BeaverUpperPaws.BROWN_LOLLIPOP,
        imageSrc: './images/layers/Brown_UpperPaws_Lollipop.png',
    },
]

export const blueUpperPaws: IBeaverConfigCard[] = [
    {
        id: BeaverUpperPaws.BLUE_DEFAULT,
        imageSrc: './images/layers/Blue_UpperPaws_Default.png',
    },
    {
        id: BeaverUpperPaws.BLUE_PHONE,
        imageSrc: './images/layers/Blue_UpperPaws_Phone.png',
    },
    {
        id: BeaverUpperPaws.BLUE_DUMBBELLS,
        imageSrc: './images/layers/Blue_UpperPaws_Dumbbells.png',
    },
    {
        id: BeaverUpperPaws.BLUE_LOLLIPOP,
        imageSrc: './images/layers/Blue_UpperPaws_Lollipop.png',
    },
]

export const violetUpperPaws: IBeaverConfigCard[] = [
    {
        id: BeaverUpperPaws.VIOLET_DEFAULT,
        imageSrc: './images/layers/Violet_UpperPaws_Default.png',
    },
    {
        id: BeaverUpperPaws.VIOLET_PHONE,
        imageSrc: './images/layers/Violet_UpperPaws_Phone.png',
    },
    {
        id: BeaverUpperPaws.VIOLET_DUMBBELLS,
        imageSrc: './images/layers/Violet_UpperPaws_Dumbbells.png',
    },
    {
        id: BeaverUpperPaws.VIOLET_LOLLIPOP,
        imageSrc: './images/layers/Violet_UpperPaws_Lollipop.png',
    },
]