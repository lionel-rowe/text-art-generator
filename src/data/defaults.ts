import { alphabetPresets } from './alphabets'

const fileName = 'eye.jpg'
const src = [process.env.PUBLIC_URL, fileName].join('/')
const alphabet = alphabetPresets.find((p) => p.default)!.content

export const DEFAULTS = {
	fileName,
	src,
	alphabet,
	resolutionX: 200,
	invert: false,
	brightness: 50,
	contrast: 50,
}
