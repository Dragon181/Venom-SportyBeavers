import React, { FC, useEffect, useState } from 'react'
import './BeavBalance.css'
import { UserService } from '../../api/sporty/user/user.service'

const BeavBalance: FC = () => {


    const [beav, setBeav] = useState<number>(0)

    useEffect(() => {
        const userService = new UserService()
        const user = userService.getFromLocalStorage()
        setBeav(user ? user.beav : 0)
    }, [])

    return (
        <div className={'beav-balance font-secondary'}>
            { beav }
        </div>
    )
}

export default BeavBalance