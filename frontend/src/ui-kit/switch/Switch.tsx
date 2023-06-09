import React, {FC, useState} from 'react'
import './Switch.css'
import {clickSound} from "../audio/button-audio.const";

type TButtonAttributes = {
    readonly id: string
    readonly label: string
    readonly onClick: () => void
}

export type TSwitchButtons = {
    readonly first: TButtonAttributes
    readonly second: TButtonAttributes
}

export interface ISwitch {
    readonly buttons: TSwitchButtons
}

const Switch: FC<ISwitch> = ({ buttons }) => {
    const [activeButtonId, setActiveButtonId] = useState<string>(
		buttons.first.id
	)

    const onClick = (
		event: React.MouseEvent<HTMLDivElement> |
			   React.TouchEvent<HTMLDivElement>
	): void => {
		clickSound.play()
		const clickedButtonId = event.currentTarget.id

		if (clickedButtonId !== activeButtonId) {
			setActiveButtonId(clickedButtonId)
		}

		if (buttons.first.id === clickedButtonId) {
			buttons.first.onClick()
		} else {
			buttons.second.onClick()
		}
	}

	const getClassName = (id: string): string =>
		id === activeButtonId ?
			'switch-button switch-button_active' :
			'switch-button'

	return (
		<div className={'switch font-secondary'}>
            <div className={getClassName(buttons.first.id)}
				 id={ buttons.first.id }
				 onClick={onClick}>
                { buttons.first.label }
            </div>
            <div className={getClassName(buttons.second.id)}
				 id={ buttons.second.id }
				 onClick={onClick}>
                { buttons.second.label }
            </div>
		</div>
	)
}

export default Switch