import React from 'react'
import './CompetitionsHeader.css'
import BackButton from '../../ui-kit/back-button/BackButton'
import BeavBalance from '../../ui-kit/beav-balance/BeavBalance'

const CompetitionsHeader = () => {
    return (
        <div className={'competitions-header'}>
            <BackButton />
            <BeavBalance />
        </div>
    )
}

export default CompetitionsHeader