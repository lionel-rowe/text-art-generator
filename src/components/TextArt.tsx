import clsx from 'clsx'
import {
	FC,
	useCallback,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import { pixelValues, appendInvisible } from '../ui/browser'
import { Point } from '../types/types'
import { getScreenDimensions, getScreenWidth, isMobile } from '../ui/browser'

const MAX_SCALE = 1

enum ZoomLevels {
	Small,
	Medium,
	Large,

	Modulus,
}

type ZoomLevel = Exclude<ZoomLevels, ZoomLevels.Modulus>

export const TextArt: FC<{
	content: string
}> = ({ content }) => {
	const [scale, setScale] = useState(1)
	const [drag, setDrag] = useState(false)
	const clickedPoint = useRef<Point>([0, 0])

	const [zoomLevel, setZoomLevel] = useState<ZoomLevel>(ZoomLevels.Small)

	const incrementZoomLevel = () =>
		setZoomLevel((x) => (x + 1) % ZoomLevels.Modulus)

	const [dummyEl, setDummyEl] = useState<HTMLPreElement | null>(null)

	const ref = useRef<HTMLPreElement>(null)

	useLayoutEffect(() => {
		const el = appendInvisible('pre')

		setDummyEl(el)

		return () => el.remove()
	}, [])

	const [naturalWidth, naturalHeight] = useMemo(() => {
		if (!dummyEl) return [0, 0]

		dummyEl.textContent = content

		const { width, height } = dummyEl.getBoundingClientRect()

		dummyEl.textContent = ''

		return [width, height]
	}, [dummyEl, content])

	const updateScale = useCallback(() => {
		if (zoomLevel === ZoomLevels.Large) {
			setScale(1)

			return
		}

		const { margin, sidebar, sidebarMarginRight } = pixelValues

		const screenWidth = getScreenWidth()
		const negativeSpace =
			zoomLevel === ZoomLevels.Small
				? margin * 2 + sidebar + sidebarMarginRight
				: 0

		const rawScale = (screenWidth - negativeSpace) / naturalWidth

		setScale(Math.min(rawScale, MAX_SCALE))
	}, [naturalWidth, zoomLevel])

	useLayoutEffect(() => {
		updateScale()

		window.addEventListener('resize', updateScale)

		return () => window.removeEventListener('resize', updateScale)
	}, [updateScale])

	useLayoutEffect(() => {
		const undrag = () => setDrag(false)
		const drag = () => setDrag(true)
		const minimize = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setZoomLevel(ZoomLevels.Small)
		}

		document.addEventListener('mousedown', undrag)
		document.addEventListener('mousemove', drag)

		window.addEventListener('keydown', minimize)

		return () => {
			document.removeEventListener('mousedown', undrag)
			document.removeEventListener('mousemove', drag)

			window.removeEventListener('keydown', minimize)
		}
	}, [])

	useLayoutEffect(() => {
		if (zoomLevel !== ZoomLevels.Small) {
			document.body.style.userSelect = 'none'
		}

		return () => {
			document.body.style.userSelect = ''
		}
	}, [zoomLevel])

	useLayoutEffect(() => {
		if (zoomLevel === ZoomLevels.Large) {
			const [x, y] = clickedPoint.current

			setTimeout(() => {
				const [width, height] = getScreenDimensions()

				window.scroll(
					x * naturalWidth - width / 2,
					y * naturalHeight - height / 2,
				)
			}, 0)
		}
	}, [zoomLevel, naturalHeight, naturalWidth])

	return (
		<div
			className={clsx({
				'center-content': zoomLevel === ZoomLevels.Small,
				interactive: !isMobile && zoomLevel === ZoomLevels.Small,
				'zoom-medium': zoomLevel !== ZoomLevels.Small,
				'zoom-large': zoomLevel === ZoomLevels.Large,
			})}
		>
			{zoomLevel !== ZoomLevels.Small && (
				<button
					type='button'
					onClick={() => setZoomLevel(ZoomLevels.Small)}
					className='close-btn'
					aria-label='Close'
				>
					<span aria-hidden>×</span>
				</button>
			)}
			<pre
				ref={ref}
				onClick={(e) => {
					// useless on mobile as pinch-to-zoom is available
					if (!drag && !isMobile) {
						const { clientX, clientY } = e

						const { x, y, width, height } =
							e.currentTarget.getBoundingClientRect()

						clickedPoint.current = [
							(clientX - x) / width,
							(clientY - y) / height,
						]

						incrementZoomLevel()
					}
				}}
				className={'text-art'}
				translate='no'
				style={{
					transform: `scale(${scale})`,
					// https://medium.com/@sai_prasanna/simulating-css-zoom-with-css3-transform-scale-461d1b9762d6
					margin:
						zoomLevel === ZoomLevels.Large
							? 0
							: `${
									-(naturalHeight - scale * naturalHeight) / 2
							  }px ${
									-(naturalWidth - scale * naturalWidth) / 2
							  }px `,
				}}
			>
				{content}
			</pre>
		</div>
	)
}
