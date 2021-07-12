import { CharVal } from './charVals'
import { polynomial, exponential } from '../utils/math'
import { PixelMatrix, Pixel } from './pixelMatrix'

export type CharPixelMatrix = CharVal[][]

export type CharPixelMatrixOptions = {
	charVals: CharVal[]
	pixelMatrix: PixelMatrix
	allPixels: Pixel[]
	brightness: number
	contrast: number
}

export const getCharPixelMatrixWithMutation = ({
	brightness,
	contrast,
	charVals,
	...options
}: CharPixelMatrixOptions): CharPixelMatrix => {
	if (!charVals.length) return []

	const charPixelMatrix = options.pixelMatrix as CharVal[][]
	const allCharPixels = options.allPixels as CharVal[]

	const multiplier = exponential(brightness)
	const polynomialFn = polynomial(exponential(contrast))

	let charValIdx = 0
	let charVal = charVals[charValIdx]

	for (const pix of allCharPixels) {
		while (charValIdx < charVals.length) {
			charVal = charVals[charValIdx]

			if (polynomialFn(pix.val) * multiplier <= charVal.val) {
				pix.ch = charVal.ch
				break
			} else {
				++charValIdx
			}
		}

		// if none matched so far, we simply use the
		// last (lightest) character
		pix.ch = charVal?.ch || ' '
	}

	// `spread`ing updates the reference, even though individual
	// rows and cells are still the same mutated ones
	return [...charPixelMatrix]
}
