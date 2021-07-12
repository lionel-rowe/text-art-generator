import { Dimensions } from '../types/types'
import { kebabize } from '../utils/formatters'

type CssVar = 'margin' | 'controls' | 'sidebar' | 'sidebarMarginRight'

export const cssVars = new Proxy(document.documentElement, {
	get: (o, k: CssVar) =>
		parseFloat(getComputedStyle(o).getPropertyValue(`--${kebabize(k)}`)),
}) as any as Record<CssVar, number>

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
