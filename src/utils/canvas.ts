export const createCanvas = (width: number, height: number) =>
	globalThis.OffscreenCanvas
		? new OffscreenCanvas(width, height)
		: (Object.assign(document.createElement('canvas'), {
				width,
				height,
			}) as HTMLCanvasElement)
