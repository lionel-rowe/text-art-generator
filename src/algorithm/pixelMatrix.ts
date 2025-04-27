import { AspectRatio, Rect } from '../types/types'
import { createCanvas } from '../utils/canvas'

export type Pixel = { val: number }
export type PixelMatrix = Pixel[][]

export type ImageSource =
	| HTMLImageElement
	| HTMLVideoElement
	| HTMLCanvasElement
	| ImageBitmap
	| OffscreenCanvas

export enum Channels {
	Red,
	Green,
	Blue,
	Alpha,

	Modulus,
}

export type Channel = Exclude<Channels, Channels.Modulus>

// https://stackoverflow.com/a/596243/
const perceivedLuminance = {
	[Channels.Red]: 0.299,
	[Channels.Green]: 0.587,
	[Channels.Blue]: 0.114,
} as const

export type ImageLuminanceOptions = {
	img: ImageSource | null
	resolutionX: number
	aspectRatio: AspectRatio
}

export const getMutableImageLuminanceValues = ({
	resolutionX,
	aspectRatio,
	img,
}: ImageLuminanceOptions) => {
	if (!img) {
		return {
			pixelMatrix: [],
			flatPixels: [],
		}
	}

	const { width, height } = img

	const scale = resolutionX / width

	const [w, h] = [width, height].map((x, i) =>
		Math.round(x * scale * aspectRatio[i]),
	)

	const rect: Rect = [0, 0, w, h]

	const canvas = createCanvas(w, h)

	const ctx = canvas.getContext('2d') as
		| OffscreenCanvasRenderingContext2D
		| CanvasRenderingContext2D

	ctx.fillStyle = '#fff'

	ctx.fillRect(...rect)

	ctx.drawImage(img, ...rect)

	const pixelData = ctx.getImageData(...rect).data

	let curPix = 0

	const pixelMatrix: { val: number }[][] = []

	let max = -Infinity
	let min = Infinity

	for (const [idx, d] of pixelData.entries()) {
		const channel = (idx % Channels.Modulus) as Channel

		if (channel !== Channels.Alpha) {
			// rgb channel
			curPix += d * perceivedLuminance[channel]
		} else {
			// append pixel and reset during alpha channel

			// we set `ch` later, on second pass
			const thisPix = { val: curPix, ch: '' }

			max = Math.max(max, curPix)
			min = Math.min(min, curPix)

			if (idx % (w * Channels.Modulus) === Channels.Alpha) {
				// first pixel of line
				pixelMatrix.push([thisPix])
			} else {
				pixelMatrix[pixelMatrix.length - 1].push(thisPix)
			}

			curPix = 0
		}
	}

	// one-dimensional form, for ease of sorting and iterating.
	// changing individual pixels within this also
	// mutates `pixelMatrix`
	const flatPixels = pixelMatrix.flat()

	for (const pix of flatPixels) {
		pix.val = (pix.val - min) / (max - min)
	}

	// sorting allows us to iterate over the pixels
	// and charVals simultaneously, in linear time
	flatPixels.sort((a, b) => a.val - b.val)

	return {
		pixelMatrix,
		flatPixels,
	}
}
