import { useMemo, useState } from 'react'

export const useRenderToken = () => {
	const [value, setValue] = useState(0)

	return useMemo(
		() => ({
			value,
			rerender: () => setValue((v) => v + 1),
		}),
		[value],
	)
}
