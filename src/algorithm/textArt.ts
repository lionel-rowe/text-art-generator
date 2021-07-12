import { CharPixelMatrix } from './charPixelMatrix'

export const getTextArt = (charPixelMatrix: CharPixelMatrix) =>
	charPixelMatrix.map((row) => row.map((x) => x.ch).join('')).join('\n')
