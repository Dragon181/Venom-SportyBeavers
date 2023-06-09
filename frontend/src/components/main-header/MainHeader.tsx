import React, { FC } from 'react'
import './MainHeader.css'
import Heading from '../../ui-kit/heading/Heading'
import BeavBalance from '../../ui-kit/beav-balance/BeavBalance'

export interface IMainHeader {
    readonly title: string
}

const MainHeader: FC<IMainHeader> = ({ title }) => {
    return (
        <div className={'main-header'}>
            <Heading text={ title } />
            <BeavBalance />
        </div>
    )
}

export default MainHeader