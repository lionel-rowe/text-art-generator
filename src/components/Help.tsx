import { FC, useState, useCallback } from 'react'
import { getScreenWidth } from '../ui/browser'
import { pixelValues } from '../ui/browser'

const Tooltip: FC<{
	content: string
}> = ({ content }) => {
	const [width, setWidth] = useState(0)

	const updateMaxWidth = useCallback((el: HTMLSpanElement) => {
		if (el) {
			setWidth(
				Math.min(
					getScreenWidth() -
						el.getBoundingClientRect().x -
						pixelValues.margin,
					400,
				),
			)
		}
	}, [])

	return (
		<span
			ref={updateMaxWidth}
			className='tooltip'
			style={{
				width,
			}}
		>
			{content}
		</span>
	)
}

export const Help: FC<{
	tooltip: string
}> = ({ tooltip }) => {
	const [visible, setVisible] = useState(false)

	const show = () => setVisible(true)
	const hide = () => setVisible(false)

	return (
		<span className='help-parent'>
			<span
				onMouseEnter={show}
				onClick={show}
				onMouseLeave={hide}
				role='button'
				aria-label='Help'
			>
				<span aria-hidden className='help'>
					?
				</span>
				{visible && <Tooltip content={tooltip}></Tooltip>}
			</span>
		</span>
	)
}
