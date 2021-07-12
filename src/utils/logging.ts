export const logColors = (
	arr: (string | [string, any] | null | undefined | false | 0)[],
) => {
	let msg = ''
	const rules: string[] = []

	for (const x of arr.filter(Boolean)) {
		let style: string, val: any

		if (typeof x === 'string') {
			style = ''
			val = x
		} else {
			;[style, val] = x as [string, any]
		}

		msg += '%c' + val

		const trimmed = style.trim()

		const props = trimmed.split(/[\s,]+/)

		const bold = props.find((p) => p === 'bold')
		const italic = props.find((p) => p === 'italic')
		const color = props.find((p) => ![bold, italic].includes(p))

		rules.push(
			[
				bold && 'font-weight: bold',
				italic && 'font-style: italic',
				color && `color: ${color}`,
			]
				.filter(Boolean)
				.join(';'),
		)
	}

	return [msg, ...rules]
}

export const log =
	(msg: string) =>
	<T>(val: T) => {
		console.info(msg, val)

		return val
	}

const TRUNCATE_LENGTH = 50

const stringifyPerfData = (data: any) => {
	try {
		const msg = JSON.stringify(data, null, '\t')
			.trim()
			.replace(/[\t\n]+/g, ' ')

		return msg.length > TRUNCATE_LENGTH
			? msg.slice(0, TRUNCATE_LENGTH) + '...'
			: msg
	} catch {
		return '...'
	}
}

const getPerfMsg = ({
	fn,
	isAsync,
	msg,
	args,
	result,
	start,
}: {
	fn: (...args: any[]) => any
	isAsync: boolean
	msg: string | null
	args: any
	result: any
	start: number
}) => {
	const argStr = stringifyPerfData(args)
		.replace(/^\[|\]$/g, '')
		.trim()

	const resultStr = stringifyPerfData(result)

	return logColors([
		['gray', `${new Date().toISOString()}:\n`],
		msg && ['yellow', `${msg} `],
		['magenta', `${isAsync ? `async ${fn.name}` : fn.name}`],
		['gray', '(\n    '],
		['gray', argStr],
		['gray', '\n) => '],
		['gray', resultStr],
		'\n',
		['cyan', `${performance.now() - start}`],
		['gray', '\xa0ms'],
	])
}

export function logPerf<T extends (...args: any[]) => any>(fn: T): T
export function logPerf<T extends (...args: any[]) => any>(
	msg: string,
	fn: T,
): T
export function logPerf<T extends (...args: any[]) => any>(...args: any) {
	const [msg, fn]: [string | null, T] =
		typeof args[0] === 'string' ? args : [null, args[0]]

	return (...args: Parameters<T>) => {
		const start = performance.now()

		const val = fn(...args)

		if (val instanceof Promise) {
			val.then((result) =>
				console.info(
					...getPerfMsg({
						fn,
						isAsync: true,
						msg,
						args,
						result,
						start,
					}),
				),
			)
		} else {
			console.info(
				...getPerfMsg({
					fn,
					isAsync: false,
					args,
					msg,
					result: val,
					start,
				}),
			)
		}

		return val
	}
}
