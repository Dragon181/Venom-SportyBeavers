import React, { useEffect, useState } from 'react'
import './Profile.css'
import Heading from '../../ui-kit/heading/Heading'
import { User } from '../../api/sporty/user/interfaces/user.interface'
import { UserService } from '../../api/sporty/user/user.service'
import ProfileBalance from '../../components/profile-balance/ProfileBalance'
import ProfileBeavers from '../../components/profile-beavers/ProfileBeavers'
import Navbar from '../../components/navbar/Navbar'
import UnderlineHeading from '../../ui-kit/underline-heading/UnderlineHeading'

const Profile = () => {
    const [user, setUser] = useState<User>()

    useEffect(() => {
        const userService = new UserService()
        const user = userService.getFromLocalStorage()
        setUser(user)
    }, [])

    return (
        <div className={'profile'}>
            <Heading text={'Inventory and Wallets'} />
            <ProfileBalance beav={ (user && user.beav) ? user.beav : 0 } />

            <UnderlineHeading text={`Beavers`} />
            <ProfileBeavers beavers={user ? user.beavers : []} />

            <Navbar />
        </div>
    )
}

export default Profile