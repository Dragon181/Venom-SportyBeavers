import React, { useEffect } from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import { clickSound } from '../../ui-kit/audio/button-audio.const'

interface INavbarItem {
    readonly id: 'navbar-main' | 'navbar-profile' | 'navbar-market' | 'navbar-competitions' | 'navbar-league-choice'
    readonly iconName: 'MainScreenIcon' | 'ProfileIcon' | 'MarketIcon' | 'CompetitionsIcon' | 'HatkaIcon'
    readonly label: 'Main' | 'Marketplace' | 'Profile'
    readonly navigateTo: '/main' | '/profile' | '/market' | '/league-choice'
}

const NavbarItem = (item: INavbarItem) => {
    const navigate = useNavigate()

    let className = 'navbar__item'

    const pageId = item.id.slice(7, item.id.length)
    if (window.location.pathname === '/' + pageId) {
        className += ' navbar__item_active'
    }

    useEffect(() => {
        if (window.location.pathname === '/competitions') {
            const competitionsNavbarItem = document.getElementById('navbar-league-choice')
            if (competitionsNavbarItem) {
                competitionsNavbarItem.classList.add('navbar__item_active')
            }
        }
    }, [])

    return (
        <div className={className} id={item.id} onClick={ () => navigate(item.navigateTo) }
             onMouseDown={ () => { clickSound.play() } }>
            <img src={'../images/' + item.iconName + '.png'} alt={item.iconName} />
            <span className={'font-secondary'}>{ item.label }</span>
        </div>
    )
}

const Navbar = () => {
    return (
        <div className={'navbar navbar_active'}>
            <NavbarItem label={'Main'} id={'navbar-main'} iconName={'MainScreenIcon'} navigateTo={'/main'} />
            <NavbarItem label={'Marketplace'} id={'navbar-market'} iconName={'MarketIcon'} navigateTo={'/market'} />
            <NavbarItem label={'Profile'} id={'navbar-profile'} iconName={'HatkaIcon'} navigateTo={'/profile'} />
        </div>
    )
}

export default Navbar