const imgCache = new Map<string, HTMLImageElement>()

export const loadImage = (src: string) =>
	new Promise<HTMLImageElement>((res) => {
		const cached = imgCache.get(src)

		if (cached) return void res(cached)

		const img = document.createElement('img')

		img.onload = () => {
			imgCache.set(src, img)

			res(img)
		}

		img.crossOrigin = 'anonymous'
		img.src = src
	})

export const readFile = (file: File) =>
	new Promise<string>((res) => {
		const reader = new FileReader()

		reader.onload = (e) => res(e.target!.result as string)

		reader.readAsDataURL(file)
	})
