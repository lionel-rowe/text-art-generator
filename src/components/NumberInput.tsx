import { Dispatch, SetStateAction } from 'react'
import { Config } from '../App'

type Props<T extends keyof Config> = {
	configItem: Record<T, number>
	min: number
	max: number
	step: number
	label: string
	setConfig: Dispatch<SetStateAction<Partial<Config>>>
}

export function NumberInput<T extends keyof Config>({
	label,
	setConfig,
	configItem,
	...htmlAttrs
}: Props<T>) {
	const entries = Object.entries(configItem)

	if (entries.length !== 1)
		throw new RangeError('config item must be a single item')

	const [[id, defaultValue]] = entries as [[T, number]]

	return (
		<>
			<label htmlFor={id}>{label}</label>

			<input
				type='number'
				{...{
					...htmlAttrs,
					id,
					defaultValue,
				}}
				onChange={(e) => {
					const n = Number(e.currentTarget.value)

					const isValid =
						e.currentTarget.value &&
						e.currentTarget.reportValidity()

					if (isValid) setConfig({ [id]: n })
				}}
			/>
		</>
	)
}
