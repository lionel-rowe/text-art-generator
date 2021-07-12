export const kebabize = (camel: string) => {
	return camel.replace(/[a-z][A-Z]/g, (m) => [...m].join('-').toLowerCase())
}

export const camelize = (kebab: string) =>
	kebab.replace(/([a-z])-([a-z])/g, (_, p1, p2) => p1 + p2.toUpperCase())
