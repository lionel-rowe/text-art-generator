import { AspectRatio, Rect } from '../types/types'

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

type ImageLuminanceOptions = {
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
			allPixels: [],
		}
	}

	const { width, height } = img

	const scale = resolutionX / width

	const [w, h] = [width, height].map((x, i) =>
		Math.round(x * scale * aspectRatio[i]),
	)

	const rect: Rect = [0, 0, w, h]

	const canvas = document.createElement('canvas')

	canvas.width = w
	canvas.height = h

	const ctx = canvas.getContext('2d')!

	ctx.fillStyle = '#fff'

	ctx.fillRect(...rect)

	ctx.drawImage(img, ...rect)

	const pixelData = ctx.getImageData(...rect).data

	let curPix = 0

	// two-dimensional matrix form, for output
	const pixelMatrix: { val: number }[][] = []

	// one-dimensional form, for ease of sorting and iterating.
	// changing individual pixels within this also
	// mutates `pixelMatrix`
	const allPixels: { val: number }[] = []

	let max = -Infinity
	let min = Infinity

	for (const [idx, d] of pixelData.entries()) {
		const subPixel = (idx % Channels.Modulus) as Channel

		if (subPixel !== Channels.Alpha) {
			// rgb channel
			curPix += d * perceivedLuminance[subPixel]
		} else {
			// append pixel and reset during alpha channel

			// we set `ch` later, on second pass
			const thisPix = { val: curPix }

			max = Math.max(max, curPix)
			min = Math.min(min, curPix)

			if (idx % (w * Channels.Modulus) === Channels.Alpha) {
				// first pixel of line
				pixelMatrix.push([thisPix])
			} else {
				pixelMatrix[pixelMatrix.length - 1].push(thisPix)
			}

			allPixels.push(thisPix)

			curPix = 0
		}
	}

	for (const pix of allPixels) {
		pix.val = (pix.val - min) / (max - min)
	}

	// sorting allows us to iterate over the pixels
	// and charVals simultaneously, in linear time
	allPixels.sort((a, b) => a.val - b.val)

	return {
		pixelMatrix,
		allPixels,
	}
}
