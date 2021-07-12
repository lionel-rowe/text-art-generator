export const findKey =
	<TK extends string, TV>(val: TV) =>
	(obj: Record<TK, TV>) =>
		(Object.keys(obj) as TK[]).find((key) => obj[key as TK] === val)

export const deepClone = <T>(v: T): T => JSON.parse(JSON.stringify(v))
