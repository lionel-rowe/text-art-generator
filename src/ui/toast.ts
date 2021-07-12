import { nextAnimationFrame, sleep } from '../utils/promisify'

type ToastStyle = 'success' | 'failure' | 'generic'

type ToastOptions = {
	style: ToastStyle
}

type ToastStyleInfo = { icon: string }

const toastStyles: Record<ToastStyle, ToastStyleInfo> = {
	success: { icon: '✅' },
	failure: { icon: '❌' },
	generic: { icon: '' },
}

type FireToastFn = (msg: string) => void

const fireToast =
	(options: ToastOptions): FireToastFn =>
	async (msg) => {
		const div = document.createElement('div')

		div.classList.add('toast')

		div.style.opacity = '0'
		div.style.transition = 'opacity 0.6s'

		div.textContent = [toastStyles[options.style].icon, msg]
			.filter(Boolean)
			.join(' ')

		document.body.appendChild(div)

		await nextAnimationFrame()

		div.style.opacity = '1'

		await sleep(2600)

		div.style.transition = 'opacity 0.8s'
		div.style.opacity = '0'

		await sleep(800)

		div.remove()
	}

export const toast = Object.fromEntries(
	Object.keys(toastStyles).map((style) => [
		style,
		fireToast({ style: style as ToastStyle }),
	]),
) as Record<ToastStyle, FireToastFn>
