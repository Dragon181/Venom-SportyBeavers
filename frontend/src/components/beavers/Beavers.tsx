import React, {MouseEventHandler, useEffect, useState} from 'react'
import './Beavers.css'
import { Beaver } from '../../api/sporty/beaver/interfaces/beaver.interface'
import { UserService } from '../../api/sporty/user/user.service'
import { BeaverService } from '../../api/sporty/beaver/beaver.service'
import Points from '../points/Points'
import BeaverItem from '../beaver-item/BeaverItem'

const Beavers = () => {
    const [beavers, setBeavers] = useState<Beaver[]>([])

    useEffect(() => {
        const userService = new UserService()
        const user = userService.getFromLocalStorage()
        setBeavers((user && user.beavers) ? user.beavers : [])
    }, [])
    
    const [activeIndex, setActiveIndex] = useState<number>(0)

    useEffect(() => {
        const beaverService = new BeaverService()
        beaverService.setActiveBeaverInLocalStorage(beavers[activeIndex])
    }, [activeIndex, beavers])

    const [touchStartX, setTouchStartX] = useState<number>(0)
    const swipeHandler = (event: React.TouchEvent<HTMLDivElement>): void => {
        if (event.changedTouches[0].clientX === touchStartX) return
        swipe(event.changedTouches[0].clientX < touchStartX)
    }
    const touchStartHandler = (event: React.TouchEvent<HTMLDivElement>): void => {
        setTouchStartX(event.touches[0].clientX)
    }
    
    const swipe = (next: boolean): void => {
        if (next) {
            if (activeIndex + 1 === beavers.length) {
                setActiveIndex(0)
            } else if (beavers.length) {
                setActiveIndex(activeIndex + 1)
            }
        } else {
            if (activeIndex === 0 && beavers.length) {
                setActiveIndex(beavers.length - 1)
            } else {
                setActiveIndex(activeIndex - 1)
            }
        }
    }

    const dragHandler = (event: React.DragEvent<HTMLDivElement>): void => {
        console.log(event.currentTarget.className)
        swipe(true)
    }

    return (
        <div className={'beavers-wrapper'}>
            <div className={'beavers'}
                 onDragEnd={ dragHandler }
                 onTouchStart={ touchStartHandler }
                 onTouchEnd={ swipeHandler } >
                <div className={'beavers__background-gradient'}></div>

                {
                    beavers.map(
                        (beaver, index) =>
                            <BeaverItem active={index === activeIndex} beaver={beaver} key={index} />
                    )
                }
            </div>
            <Points activeIndex={activeIndex} />
        </div>
    )
}

export default Beavers