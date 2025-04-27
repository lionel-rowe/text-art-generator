import { CharSet } from './charSet'
import { appendInvisible } from '../ui/browser'
import { AspectRatio } from '../types/types'
import { memoize, LruCache } from '../utils/cache'

// separators and newlines don't play well with the rendering logic
const SEPARATOR_REGEX = /[\n\p{Z}]/u

const REPEAT_COUNT = 100

const pre = appendInvisible('pre')
pre.classList.add('text-art')

const getCharScalingData = memoize(_getCharScalingData, {
	cache: new LruCache(100),
})
function _getCharScalingData(
	ch: string,
	repeatCount: number,
): {
	width: number
	height: number
	aspectRatio: AspectRatio
} {
	pre.textContent = new Array(repeatCount)
		.fill(ch.repeat(repeatCount))
		.join('\n')

	const { width, height } = pre.getBoundingClientRect()

	const min = Math.min(width, height)

	pre.textContent = ''

	return {
		width: width / repeatCount,
		height: height / repeatCount,
		aspectRatio: [min / width, min / height],
	}
}

export function getAlphabetScalingData(charSet: CharSet): {
	width: number
	height: number
	aspectRatio: AspectRatio
} {
	for (const ch of charSet) {
		if (!SEPARATOR_REGEX.test(ch)) {
			return getCharScalingData(ch, REPEAT_COUNT)
		}
	}

	return getCharScalingData('x', REPEAT_COUNT)
}

export const getAlphabetDimensionConsistency = (charSet: CharSet) => {
	return [...charSet]
		.map((ch) => ({ ch, ...getCharScalingData(ch, 1) }))
		.reduce(
			(obj, { ch, width, height }) => {
				const dims = [width, height].join(',')

				obj[dims] = (obj[dims] || '') + ch

				return obj
			},
			{} as Record<string, string>,
		)
}

// // for debug usage
// logPerf('alphabet consistency', () => {
//     for (const [k, v] of Object.entries(presets)) {
//         console.info(k, getAlphabetDimensionConsistency(getCharSet( v.content)))
//     }
// })()
