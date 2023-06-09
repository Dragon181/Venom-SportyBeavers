import React, { useEffect, useState } from 'react'

const OnboardingNavigationDemo = () => {
    const [active, setActive] = useState<boolean>(true)

    useEffect(() => {
        setTimeout(() => {
            setActive(false)
        }, 3000)
    }, [])

    const demoContainerCss: React.CSSProperties = {
        width: '100vw',
        height: '100vh',
        opacity: active ? 1 : 0,
        transition: 'opacity 200ms ease-in-out',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        background: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(4px)'
    }

    const demoCss: React.CSSProperties = {
        position: 'relative',
        width: '100%',
        height: '100%',
    }

    const navContainerCss: React.CSSProperties = {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    }

    const prevButtonCss: React.CSSProperties = {
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='44' height='24' viewBox='0 0 44 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M42 13.5C42.8284 13.5 43.5 12.8284 43.5 12C43.5 11.1716 42.8284 10.5 42 10.5V13.5ZM0.939339 10.9393C0.353554 11.5251 0.353554 12.4749 0.939339 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97919 12.6066 1.3934C12.0208 0.807611 11.0711 0.807611 10.4853 1.3934L0.939339 10.9393ZM42 10.5L2 10.5V13.5L42 13.5V10.5Z' fill='white'/%3E%3C/svg%3E%0A")`,
        width: '44px',
        height: '24px',
        marginRight: '12px',
    }

    const nextButtonCss: React.CSSProperties = {
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='45' height='24' viewBox='0 0 45 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 10.5C1.17157 10.5 0.5 11.1716 0.5 12C0.5 12.8284 1.17157 13.5 2 13.5L2 10.5ZM44.0607 13.0607C44.6464 12.4749 44.6464 11.5251 44.0607 10.9393L34.5147 1.3934C33.9289 0.807609 32.9792 0.807609 32.3934 1.3934C31.8076 1.97918 31.8076 2.92893 32.3934 3.51472L40.8787 12L32.3934 20.4853C31.8076 21.0711 31.8076 22.0208 32.3934 22.6066C32.9792 23.1924 33.9289 23.1924 34.5147 22.6066L44.0607 13.0607ZM2 13.5L43 13.5L43 10.5L2 10.5L2 13.5Z' fill='white'/%3E%3C/svg%3E%0A")`,
        width: '44px',
        height: '24px',
        marginLeft: '12px'
    }

    const navSpanCss: React.CSSProperties = {
        fontWeight: 500,
        fontSize: '20px',
        lineHeight: '150%',
        letterSpacing: '0.01em',
        color: '#FFFFFF',
    }

    const navLineCss: React.CSSProperties = {
        width: 0,
        height: 'calc(100% - 118px)',
        opacity: 0.5,
        border: '1px solid #FFFFFF',
        margin: '0 36px'
    }

    return (
        <div style={demoContainerCss}>
            <div style={demoCss}>
                <div style={navContainerCss}>
                    <div style={prevButtonCss}></div>
                    <span style={navSpanCss} className={'font-secondary'}>Back</span>
                    <div style={navLineCss}></div>
                    <span style={navSpanCss} className={'font-secondary'}>Next</span>
                    <div style={nextButtonCss}></div>
                </div>
            </div>
        </div>
    )
}

export default OnboardingNavigationDemo