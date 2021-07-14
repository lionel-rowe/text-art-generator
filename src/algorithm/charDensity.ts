import { Channels } from './pixelMatrix'
import { Rect } from '../types/types'

export type CharVal = {
	ch: string
	val: number
}

export type RawCharDensityData = {
	charVals: CharVal[]
	min: number
	max: number
}

type CharValsOptions = {
	invert: boolean
}

export type CharSet = string & {
	readonly CharSet: unique symbol
}

export const getCharSet = (alphabet: string) =>
	[...new Set(alphabet)]
		.filter((ch) => ch !== '\n')
		.sort((a, b) => a.localeCompare(b))
		.join('') as CharSet

export const getRawCharDensity =
	(ctx: CanvasRenderingContext2D) =>
	(ch: string): CharVal => {
		const { canvas } = ctx

		canvas.height = 70
		canvas.width = 70

		const { width, height } = canvas

		const rect: Rect = [0, 0, width, height]

		ctx.font = '48px monospace'

		ctx.clearRect(...rect)

		ctx.fillStyle = '#000'
		ctx.fillText(ch, 10, 50)

		const val = ctx
			.getImageData(...rect)
			.data.reduce(
				(acc, cur, idx) =>
					idx % Channels.Modulus === Channels.Alpha ? acc - cur : acc,
				0,
			)

		return {
			ch,
			val,
		}
	}

export const getRawCharDensities = (charSet: CharSet): RawCharDensityData => {
	const canvas = document.createElement('canvas')

	const ctx = canvas.getContext('2d')!

	const charVals = [...charSet].map(getRawCharDensity(ctx))

	let max = -Infinity
	let min = Infinity

	for (const { val } of charVals) {
		max = Math.max(max, val)
		min = Math.min(min, val)
	}

	return {
		charVals,
		min,
		max,
	}
}

export const getNormalizedCharDensities =
	({ invert }: CharValsOptions) =>
	({ charVals, min, max }: RawCharDensityData) => {
		// minimum of 1, to prevent dividing by 0
		const range = max - min || 1

		return charVals
			.map(({ ch, val }) => {
				const v = (val - min) / range

				return {
					ch,
					val: invert ? 1 - v : v,
				}
			})
			.sort((a, b) => a.val - b.val)
	}
