import { ViableCharSet } from './charVals'
import { appendInvisible } from '../ui/browser'
import { AspectRatio } from '../types/types'

// separators and newlines don't play well with the rendering logic
const SEPARATOR_REGEX = /[\n\p{Z}]/u

const REPEAT_COUNT = 100

const pre = appendInvisible('pre')

const _getCharScalingData =
	(repeatCount: number) =>
	(
		ch: string,
	): {
		width: number
		height: number
		aspectRatio: AspectRatio
	} => {
		pre.textContent = `${`${ch.repeat(repeatCount)}\n`.repeat(repeatCount)}`

		const { width, height } = pre.getBoundingClientRect()

		const min = Math.min(width, height)

		pre.textContent = ''

		return {
			width: width / repeatCount,
			height: height / repeatCount,
			aspectRatio: [min / width, min / height],
		}
	}

export function getAlphabetScalingData(viableCharSet: ViableCharSet): {
	width: number
	height: number
	aspectRatio: AspectRatio
} {
	for (const ch of viableCharSet) {
		if (!SEPARATOR_REGEX.test(ch)) {
			return _getCharScalingData(REPEAT_COUNT)(ch)
		}
	}

	return _getCharScalingData(REPEAT_COUNT)(' ')
}

export const getAlphabetDimensionConsistency = (
	viableCharSet: ViableCharSet,
) => {
	return [...viableCharSet]
		.map((ch) => ({ ch, ..._getCharScalingData(1)(ch) }))
		.reduce((obj, { ch, width, height }) => {
			const dims = [width, height].join(',')

			obj[dims] = (obj[dims] || '') + ch

			return obj
		}, {} as Record<string, string>)
}

// // for debug usage
// logPerf('alphabet consistency', () => {
//     for (const [k, v] of Object.entries(presets)) {
//         console.info(k, getAlphabetDimensionConsistency(getViableCharSet( v.content)))
//     }
// })()
