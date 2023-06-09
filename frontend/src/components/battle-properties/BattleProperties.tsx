import React, { FC } from 'react'
import './BattleProperties.css'
import { IMoveClasses } from '../../pages/battle/Battle'

export interface IBattleProperties {
    readonly moveItemClasses: IMoveClasses
    readonly movesDisabled: boolean
    readonly maxHealth: number
    readonly health: number
    readonly strength: number
    readonly agility: number
    readonly endurance: number
    readonly moral: number
    readonly isUser: boolean
}

const BattleProperties: FC<IBattleProperties> = (props) => {

    const isUserClassName = props.isUser ? 'battle-properties_isUser' : ''

    const healthPercent: number = ((props.health / props.maxHealth) * 100)

    const getPropertyItemStyle = (property: 'strength' | 'agility' | 'endurance' | 'moral'): React.CSSProperties => {
        if (property === 'moral') {
            if (props.movesDisabled) {
                if (props.moveItemClasses.strength === 'battle-moves__both') return {transition: 'opacity 100ms ease-in-out'}
                if (props.moveItemClasses.agility === 'battle-moves__both') return {transition: 'opacity 100ms ease-in-out'}
                if (props.moveItemClasses.endurance === 'battle-moves__both') return {transition: 'opacity 100ms ease-in-out'}
                return {
                    transition: 'opacity 100ms ease-in-out',
                    opacity: 0.6
                }
            }
            return { transition: 'opacity 100ms ease-in-out' }
        } else {
            if (props.movesDisabled) {
                if (props.moveItemClasses[property] === 'battle-moves__user' && props.isUser) {
                    return { transition: 'opacity 100ms ease-in-out' }
                } else if (props.moveItemClasses[property] === 'battle-moves__opponent' && !props.isUser) {
                    return { transition: 'opacity 100ms ease-in-out' }
                }
            } else {
                return { transition: 'opacity 100ms ease-in-out' }
            }
        }

        return {
            transition: 'opacity 100ms ease-in-out',
            opacity: 0.6
        }
    }

    const getPropertyIconStyle = (property: 'strength' | 'agility' | 'endurance' | 'moral'): React.CSSProperties => {
        const userBackground: string = 'linear-gradient(0deg, rgba(241, 241, 241, 0.1), rgba(241, 241, 241, 0.1)), linear-gradient(104.25deg, rgba(130, 232, 255, 0.8) 0%, rgba(55, 159, 255, 0.8) 100%)'
        const opponentBackground: string = 'linear-gradient(0deg, rgba(241, 241, 241, 0.1), rgba(241, 241, 241, 0.1)), linear-gradient(104.25deg, rgba(255, 124, 226, 0.8) 0%, rgba(255, 0, 199, 0.8) 100%)'

        if (property === 'moral') {
            if (props.moveItemClasses.strength === 'battle-moves__both') return {
                background: props.isUser ? userBackground : opponentBackground
            }
            if (props.moveItemClasses.agility === 'battle-moves__both') return {
                background: props.isUser ? userBackground : opponentBackground
            }
            if (props.moveItemClasses.endurance === 'battle-moves__both') return {
                background: props.isUser ? userBackground : opponentBackground
            }
        } else {
            if (props.isUser) {
                if (property === 'strength' && props.moveItemClasses.strength === 'battle-moves__user') return { background: userBackground }
                if (property === 'agility' && props.moveItemClasses.agility === 'battle-moves__user') return { background: userBackground }
                if (property === 'endurance' && props.moveItemClasses.endurance === 'battle-moves__user') return { background: userBackground }
            } else {
                if (property === 'strength' && props.moveItemClasses.strength === 'battle-moves__opponent') return { background: opponentBackground }
                if (property === 'agility' && props.moveItemClasses.agility === 'battle-moves__opponent') return { background: opponentBackground }
                if (property === 'endurance' && props.moveItemClasses.endurance === 'battle-moves__opponent') return { background: opponentBackground }
            }
        }

        return {}
    }

    return (
        <div className={'battle-properties ' + isUserClassName }>
            <div className={'battle-properties__item'}>
                <div className={'battle-properties__stamina font-secondary'}>
                    <div className={'battle-properties__stamina-flashed'} style={{
                        width: `calc(${healthPercent}% - 4px)`
                    }}></div>
                    Health
                </div>
                <span className={'battle-properties__point font-secondary'}>
                    { props.health }
                </span>
            </div>

            <div className={'battle-properties__item'} style={getPropertyItemStyle('strength')}>
                <div className={'battle-properties__prop'}>
                    <div className={'battle-properties__item-icon'} style={getPropertyIconStyle('strength')}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.5938 5.50007C14.4399 5.49507 14.2872 5.5281 14.1492 5.59624C14.0112 5.66438 13.8921 5.76552 13.8025 5.89069C13.7949 5.90159 13.784 5.90978 13.7714 5.91407C13.7589 5.91836 13.7453 5.91853 13.7326 5.91456C13.7199 5.91059 13.7088 5.90268 13.7009 5.89198C13.693 5.88129 13.6888 5.86835 13.6888 5.85507V4.70975C13.6888 4.06132 13.1781 3.51569 12.53 3.50038C12.3716 3.49638 12.214 3.52412 12.0664 3.58199C11.9189 3.63985 11.7844 3.72666 11.671 3.83729C11.5575 3.94793 11.4673 4.08016 11.4058 4.22619C11.3442 4.37222 11.3125 4.52909 11.3125 4.68757V7.25007C11.3125 7.26664 11.3059 7.28254 11.2942 7.29426C11.2825 7.30598 11.2666 7.31257 11.25 7.31257H4.75C4.73342 7.31257 4.71753 7.30598 4.70581 7.29426C4.69408 7.28254 4.6875 7.26664 4.6875 7.25007V4.70975C4.6875 4.06132 4.17687 3.51569 3.52875 3.50038C3.37043 3.49654 3.21294 3.52442 3.06555 3.58236C2.91816 3.6403 2.78385 3.72713 2.67052 3.83775C2.5572 3.94837 2.46714 4.08054 2.40565 4.22649C2.34417 4.37243 2.3125 4.5292 2.3125 4.68757V5.85569C2.31247 5.86898 2.3082 5.88191 2.30032 5.89261C2.29244 5.90331 2.28136 5.91122 2.26868 5.91519C2.256 5.91916 2.24238 5.91899 2.22981 5.91469C2.21723 5.9104 2.20636 5.90221 2.19875 5.89132C2.10912 5.76585 1.98987 5.66448 1.85161 5.59622C1.71335 5.52796 1.56036 5.49493 1.40625 5.50007C0.896875 5.516 0.5 5.94725 0.5 6.45694V9.54194C0.5 10.0516 0.898125 10.4829 1.40625 10.4988C1.56009 10.5038 1.7128 10.4708 1.85082 10.4026C1.98884 10.3345 2.10792 10.2334 2.1975 10.1082C2.20492 10.0967 2.21592 10.0879 2.22881 10.0832C2.2417 10.0786 2.25577 10.0783 2.26884 10.0824C2.28191 10.0865 2.29326 10.0948 2.30115 10.1061C2.30904 10.1173 2.31303 10.1307 2.3125 10.1444V11.2904C2.3125 11.9376 2.82313 12.4844 3.47125 12.5001C3.6296 12.5039 3.78711 12.476 3.93452 12.4181C4.08193 12.3601 4.21625 12.2732 4.32959 12.1626C4.44292 12.0519 4.53297 11.9197 4.59444 11.7737C4.6559 11.6278 4.68755 11.471 4.6875 11.3126V8.75007C4.6875 8.73349 4.69408 8.71759 4.70581 8.70587C4.71753 8.69415 4.73342 8.68757 4.75 8.68757H11.25C11.2666 8.68757 11.2825 8.69415 11.2942 8.70587C11.3059 8.71759 11.3125 8.73349 11.3125 8.75007V11.2904C11.3125 11.9388 11.8231 12.4844 12.4712 12.4998C12.6296 12.5036 12.7871 12.4757 12.9344 12.4178C13.0818 12.3598 13.2161 12.273 13.3295 12.1624C13.4428 12.0518 13.5329 11.9196 13.5943 11.7736C13.6558 11.6277 13.6875 11.4709 13.6875 11.3126V10.1444C13.6875 10.1312 13.6918 10.1182 13.6997 10.1075C13.7076 10.0968 13.7186 10.0889 13.7313 10.0849C13.744 10.081 13.7576 10.0811 13.7702 10.0854C13.7828 10.0897 13.7936 10.0979 13.8013 10.1088C13.8909 10.2343 14.0101 10.3357 14.1484 10.4039C14.2867 10.4722 14.4396 10.5052 14.5938 10.5001C15.1031 10.4841 15.5 10.0529 15.5 9.54319V6.45757C15.5 5.94788 15.1019 5.51663 14.5938 5.50007Z" fill="white"/>
                        </svg>
                    </div>
                    <span className={'battle-properties__label font-secondary'}>
                        Strength
                    </span>
                </div>
                <span className={'battle-properties__point font-secondary'}>
                    { props.strength }
                </span>
            </div>

            <div className={'battle-properties__item'} style={getPropertyItemStyle('agility')}>
                <div className={'battle-properties__prop'}>
                    <div className={'battle-properties__item-icon'} style={getPropertyIconStyle('agility')}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g>
                                <path d="M14.5672 0.45729C14.4643 0.458025 14.363 0.481977 14.2716 0.527208L7.8589 3.60119H0.80773C0.571481 3.59799 0.351734 3.71699 0.232635 3.91262C0.113536 4.10826 0.113536 4.35022 0.232635 4.54585C0.351735 4.74149 0.571482 4.86049 0.80773 4.85728H0.862747L6.04844 5.48533V9.02421V11.7609V14.906C6.0451 15.1325 6.16923 15.3432 6.37328 15.4574C6.57734 15.5715 6.82972 15.5715 7.03378 15.4574C7.23784 15.3432 7.36196 15.1325 7.35862 14.906L7.7463 10.8274C7.76333 10.6478 7.81902 10.4735 7.91007 10.3159L8.67648 8.98496C8.89986 8.59683 9.31308 8.34475 9.77426 8.31398L14.5211 7.99751H14.5646C14.8009 8.00071 15.0206 7.88171 15.1397 7.68608C15.2588 7.49044 15.2588 7.24848 15.1397 7.05285C15.0206 6.85721 14.8009 6.73821 14.5646 6.74142H9.32389V5.45834L14.9152 1.62015C15.1654 1.47238 15.2823 1.18296 15.2013 0.912156C15.1202 0.641348 14.861 0.455408 14.5672 0.45729H14.5672ZM10.3065 9.2536C9.40204 9.2536 8.6688 9.95656 8.6688 10.8237C8.6688 11.6909 9.40204 12.3938 10.3065 12.3938C11.211 12.3938 11.9442 11.6909 11.9442 10.8237C11.9442 9.95656 11.211 9.2536 10.3065 9.2536Z" fill="white"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_4064_24881">
                                    <rect width="16" height="16" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <span className={'battle-properties__label font-secondary'}>
                        Agility
                    </span>
                </div>
                <span className={'battle-properties__point font-secondary'}>
                    { props.agility }
                </span>
            </div>

            <div className={'battle-properties__item'} style={getPropertyItemStyle('endurance')}>
                <div className={'battle-properties__prop'}>
                    <div className={'battle-properties__item-icon'} style={getPropertyIconStyle('endurance')}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.5 8.49995C13.1899 8.5004 12.8876 8.59674 12.6344 8.77577C12.3813 8.9548 12.1897 9.20776 12.0859 9.49995H10.8603L9.97437 6.84183C9.94059 6.74055 9.87527 6.65274 9.78798 6.59126C9.70069 6.52979 9.59601 6.49786 9.48927 6.50017C9.38253 6.50247 9.27933 6.53889 9.19478 6.60408C9.11022 6.66927 9.04876 6.75981 9.01937 6.86245L7.62844 11.73L5.99312 1.91745C5.97416 1.80416 5.91677 1.70085 5.83059 1.6249C5.74442 1.54895 5.63472 1.50498 5.51994 1.5004C5.40516 1.49581 5.2923 1.53089 5.20035 1.59973C5.10839 1.66857 5.04294 1.76697 5.015 1.87839L3.10969 9.49995H1.5C1.36739 9.49995 1.24021 9.55263 1.14645 9.6464C1.05268 9.74017 1 9.86735 1 9.99995C1 10.1326 1.05268 10.2597 1.14645 10.3535C1.24021 10.4473 1.36739 10.5 1.5 10.5H3.5C3.6115 10.4999 3.71979 10.4627 3.80767 10.394C3.89554 10.3254 3.95796 10.2294 3.985 10.1212L5.40187 4.45339L7.00687 14.0821C7.02537 14.1943 7.0815 14.2967 7.16603 14.3727C7.25055 14.4486 7.35843 14.4935 7.47187 14.5H7.50031C7.60887 14.4999 7.71445 14.4644 7.80111 14.399C7.88776 14.3337 7.95077 14.2418 7.98062 14.1375L9.53687 8.6912L10.0256 10.1581C10.0588 10.2576 10.1225 10.3442 10.2076 10.4056C10.2928 10.4669 10.3951 10.5 10.5 10.5H12.0859C12.1776 10.7592 12.3388 10.9883 12.5519 11.1622C12.7649 11.336 13.0217 11.448 13.2941 11.4857C13.5665 11.5235 13.844 11.4857 14.0964 11.3764C14.3487 11.267 14.5662 11.0905 14.7249 10.8659C14.8837 10.6414 14.9777 10.3775 14.9966 10.1031C15.0155 9.82879 14.9586 9.55452 14.8322 9.3103C14.7058 9.06609 14.5146 8.86133 14.2797 8.71842C14.0447 8.5755 13.775 8.49993 13.5 8.49995Z" fill="white"/>
                        </svg>
                    </div>
                    <span className={'battle-properties__label font-secondary'}>
                        Endurance
                    </span>
                </div>
                <span className={'battle-properties__point font-secondary'}>
                    { props.endurance }
                </span>
            </div>

            <div className={'battle-properties__item'} style={getPropertyItemStyle('moral')}>
                <div className={'battle-properties__prop'}>
                    <div className={'battle-properties__item-icon'} style={getPropertyIconStyle('moral')}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.5 10C3.5 7.09375 7.375 4.84375 6.5 1.5C8.5625 1.5 12.5 4.5 12.5 10C12.5 11.1935 12.0259 12.3381 11.182 13.182C10.3381 14.0259 9.19347 14.5 8 14.5C6.80653 14.5 5.66193 14.0259 4.81802 13.182C3.97411 12.3381 3.5 11.1935 3.5 10Z" stroke="#E14F20"/>
                            <path d="M10 11.5C10 13.3034 9 14 8 14C7 14 6 13.3034 6 11.5C6 9.69656 7.25 8.8125 7 7.5C8.3125 7.5 10 9.69656 10 11.5Z" stroke="#E14F20"/>
                        </svg>
                    </div>
                    <span className={'battle-properties__label font-secondary battle-properties_red'}>
                        Moral
                    </span>
                </div>
                <span className={'battle-properties__point font-secondary battle-properties_red'}>
                    { props.moral }
                </span>
            </div>
        </div>
    )
}

export default BattleProperties