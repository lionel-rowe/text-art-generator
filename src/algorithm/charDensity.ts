import { Channels } from './pixelMatrix'
import { Rect } from '../types/types'
import { CharSet } from './charSet'
import { createCanvas } from '../utils/canvas'

const CANVAS_SIZE = 70
const FONT_SIZE = 50

const BORDER = (CANVAS_SIZE - FONT_SIZE) / 2
const LEFT = BORDER
const BASELINE = CANVAS_SIZE - BORDER

const RECT: Rect = [0, 0, CANVAS_SIZE, CANVAS_SIZE]

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

export const getRawCharDensity =
	(ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D) =>
	(ch: string): CharVal => {
		ctx.clearRect(...RECT)
		ctx.fillText(ch, LEFT, BASELINE)

		const val = ctx
			.getImageData(...RECT)
			.data.reduce(
				(total, val, idx) =>
					idx % Channels.Modulus === Channels.Alpha
						? total - val
						: total,
				0,
			)

		return {
			ch,
			val,
		}
	}

export const getRawCharDensities = (charSet: CharSet): RawCharDensityData => {
	const canvas = createCanvas(CANVAS_SIZE, CANVAS_SIZE)

	const ctx = canvas.getContext('2d')!

	ctx.font = `${FONT_SIZE}px monospace`
	ctx.fillStyle = '#000'

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
		const range = Math.max(max - min, 1)

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
