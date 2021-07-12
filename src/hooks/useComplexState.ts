import { Dispatch, SetStateAction, useCallback, useState } from 'react'

export const useComplexState = <T>(initialState: T) => {
	const [state, _setState] = useState(initialState)

	const setState: Dispatch<SetStateAction<Partial<T>>> = useCallback(
		(update) => {
			_setState((prevState) => {
				return update instanceof Function
					? { ...prevState, ...update(prevState) }
					: { ...prevState, ...update }
			})
		},
		[],
	)

	return [state, setState] as const
}
