import { CharVal } from './charDensity'
import { polynomial, exponential } from '../utils/math'
import {
	getMutableImageLuminanceValues,
	ImageLuminanceOptions,
} from './pixelMatrix'

export type CharPixelMatrix = CharVal[][]

export type CharPixelMatrixOptions = {
	charVals: CharVal[]
	brightness: number
	contrast: number
} & ImageLuminanceOptions

let cachedLuminanceInfo = {} as ImageLuminanceOptions &
	ReturnType<typeof getMutableImageLuminanceValues>

export const getCharPixelMatrix = ({
	brightness,
	contrast,
	charVals,
	...imageLuminanceOptions
}: CharPixelMatrixOptions): CharPixelMatrix => {
	if (!charVals.length) return []

	const luminanceInfo = Object.entries(imageLuminanceOptions).every(
		([key, val]) =>
			cachedLuminanceInfo[key as keyof typeof imageLuminanceOptions] ===
			val,
	)
		? cachedLuminanceInfo
		: getMutableImageLuminanceValues(imageLuminanceOptions)

	cachedLuminanceInfo = { ...imageLuminanceOptions, ...luminanceInfo }

	const charPixelMatrix = luminanceInfo.pixelMatrix as CharVal[][]
	const allCharPixels = luminanceInfo.flatPixels as CharVal[]

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

	// cloning the array updates the reference to let React know it needs to re-render,
	// even though individual rows and cells are still the same mutated ones
	return [...charPixelMatrix]
}
