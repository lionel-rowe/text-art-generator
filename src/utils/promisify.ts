// promisified setTimeout
export const sleep = (ms: number) =>
	new Promise<ReturnType<typeof setTimeout>>((res) => {
		const t: ReturnType<typeof setTimeout> = setTimeout(() => res(t), ms)
	})

// promisified requestAnimationFrame
export const nextAnimationFrame = () =>
	new Promise<number>((resolve) => requestAnimationFrame(resolve))
