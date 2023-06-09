import React from 'react'
import './Heading.css'
import { IHeading } from './heading.interface'

const Heading = (heading: IHeading) => {
    return (
        <div className={'heading font-primary'}>
            { heading.text }
        </div>
    )
}

export default Heading