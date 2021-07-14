import { Dimensions } from '../types/types'
import { camelToKebab, KebabToCamel } from '../utils/formatters'

type CssVar = 'margin' | 'controls' | 'sidebar' | 'sidebar-margin-right'
type CssVarCamel = KebabToCamel<CssVar>

export const pixelValues = new Proxy(document.documentElement, {
	get: (o, k: CssVarCamel) =>
		parseFloat(
			getComputedStyle(o).getPropertyValue(`--${camelToKebab(k)}`),
		),
	// set: (o, k: CssVarCamel, v) => (
	// 	o.style.setProperty(`--${camelToKebab(k)}`, `${v}px`), true
	// ),
}) as any as Readonly<Record<CssVarCamel, number>>

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#mobile_tablet_or_desktop
export const isMobile = navigator.userAgent.includes('Mobi')

export const getScreenDimensions = (): Dimensions => {
	const { width, height } = isMobile
		? window.screen
		: document.documentElement.getBoundingClientRect()

	return [width, height]
}

export const getScreenWidth = () => getScreenDimensions()[0]

type HTMLElementTagNameMap = {
	div: HTMLDivElement
	pre: HTMLPreElement
	textarea: HTMLTextAreaElement
}

export const appendInvisible = <T extends keyof HTMLElementTagNameMap>(
	tag: T,
) => {
	const el = document.createElement(tag)

	el.classList.add('invisible')
	el.setAttribute('aria-hidden', 'true')

	document.body.appendChild(el)

	return el
}
