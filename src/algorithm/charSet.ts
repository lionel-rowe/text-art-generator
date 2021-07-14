export type CharSet = string & {
	readonly CharSet: unique symbol
}

// converts alphabet to a unique, ordered charset with value equality
// to prevent unnecessary re-renders or re-computations
export const getCharSet = (alphabet: string) => {
	return [...new Set(alphabet)]
		.filter((ch) => ch !== '\n')
		.sort((a, b) => a.codePointAt(0)! - b.codePointAt(0)!)
		.join('') as CharSet
}
