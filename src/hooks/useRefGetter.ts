import { MutableRefObject, useEffect, useRef, useState } from 'react'

export const useRefGetter = <T>(
	getter: () => T,
	dependencies: any[],
): MutableRefObject<T> => {
	const [state] = useState(getter)

	const ref = useRef<T>(state)

	useEffect(() => {
		ref.current = getter()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, dependencies)

	return ref
}
