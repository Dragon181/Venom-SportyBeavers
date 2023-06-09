import { ILeagueChoiceSlider } from './LeagueChoiceSlider'

export const leagueSlider: ILeagueChoiceSlider = {
    leagues: [
        {
            id: 1,
            imageSrc: './images/League1.png',
            title: 'League 1',
            description: 'For level 1 Beavers',
            gain: 1,
        },
        {
            id: 2,
            imageSrc: './images/League2.png',
            title: 'League 2',
            description: 'For level 2 Beavers',
            gain: 2,
        },
        {
            id: 3,
            imageSrc: './images/League3.png',
            title: 'League 3',
            description: 'For level 3 Beavers',
            gain: 4,
        },
        {
            id: 4,
            imageSrc: './images/League1.png',
            title: 'League 4',
            description: 'For level 4 and higher Beavers',
            gain: 10,
        },
    ]
}