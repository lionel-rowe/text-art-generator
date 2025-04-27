// modified from https://github.com/microsoft/TypeScript/pull/40336#issuecomment-684174115
type KebabToPascal<S extends string> = string extends S
	? string
	: S extends `${infer T}-${infer U}`
		? `${Capitalize<`${Lowercase<T>}`>}${KebabToPascal<U>}`
		: S extends `${infer T}`
			? `${Capitalize<`${Lowercase<T>}`>}`
			: never

export type KebabToCamel<S extends string> = S extends `${infer T}-${infer U}`
	? `${Lowercase<T>}${KebabToPascal<U>}`
	: S extends `${infer T}`
		? `${Lowercase<T>}`
		: KebabToPascal<S>

export const camelToKebab = (camel: string) =>
	camel.replace(/[a-z][A-Z]/g, (m) => [...m].join('-').toLowerCase())

export const kebabToCamel = (kebab: string) =>
	kebab.replace(/([a-z])-([a-z])/g, (_, p1, p2) => p1 + p2.toUpperCase())
