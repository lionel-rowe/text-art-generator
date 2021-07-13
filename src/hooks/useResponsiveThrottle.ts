import { Dispatch, useCallback, useRef, useState } from 'react'

const getIdleTime = (prevTimeTaken: number, maxBusyPercentage: number) =>
	Math.max((prevTimeTaken / maxBusyPercentage) * 100 - prevTimeTaken, 0)

export function useResponsiveThrottle<T>(
	initialState: T | (() => T),
	maxBusyPercentage = 50,
): [T, Dispatch<(prevState?: T) => T>] {
	const [state, _setState] = useState<T>(initialState)

	const latestTime = useRef(0)
	const cancelToken = useRef(-1)

	const setState: Dispatch<(prevState?: T) => T> = useCallback(
		(updateFn) => {
			const token = ++cancelToken.current

			const cb = () => {
				const start = Date.now()

				_setState((prevState) => {
					if (token !== cancelToken.current) {
						return prevState
					}

					const result = updateFn(prevState)

					latestTime.current = Date.now() - start

					return result
				})
			}

			const idleTime = getIdleTime(latestTime.current, maxBusyPercentage)

			if (idleTime) {
				setTimeout(cb, idleTime)
			} else {
				// update state synchronously
				cb()
			}
		},
		[maxBusyPercentage],
	)

	return [state, setState]
}
