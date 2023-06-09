import React, { FC } from 'react'

export interface ILinkButton {
    readonly title: string
    readonly href: string
}

const LinkButton: FC<ILinkButton> = ({ title, href }) => {
    const style: React.CSSProperties = {
        height: '34px',
        background: 'rgba(255, 255, 255, 0.15)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '500px',
        padding: '9px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#E1E3EA',
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '100%',
        boxSizing: 'border-box',
    }

    return (
        <a style={style} className={'font-secondary'}
           href={href} target={'_blank'} rel="noreferrer">
            { title }
        </a>
    )
}

export default LinkButton