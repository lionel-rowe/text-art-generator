import { MutableRefObject, useEffect } from 'react'

export const useExpandedHitBoxOnDrag = (
	ref: MutableRefObject<HTMLInputElement | null>,
) => {
	useEffect(() => {
		// expand hit box of image upload element to cover whole screen
		// on drag and drop, thus intercepting all drop events
		const maximizeHitBox = () => {
			ref.current?.classList.add('max-hit-box')
		}

		const revertHitBox = (e?: MouseEvent) => {
			if (
				!e || // called directly
				!(e.buttons & 1) // primary mouse button not pressed
			) {
				ref.current?.classList.remove('max-hit-box')
			}
		}

		document.addEventListener('dragenter', maximizeHitBox)

		document.addEventListener('mousemove', revertHitBox)
		document.addEventListener('drop', revertHitBox)

		return () => {
			revertHitBox()

			document.removeEventListener('dragenter', maximizeHitBox)

			document.removeEventListener('mousemove', revertHitBox)
			document.removeEventListener('drop', revertHitBox)
		}
	}, [ref])
}
