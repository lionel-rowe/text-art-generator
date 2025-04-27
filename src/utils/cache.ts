// @ts-ignore TODO fix JSR types
import { memoize as m, LruCache as L } from '@std/cache'

const LruCache = L as {
	new <K, V>(maxSize: number): Map<K, V>
}
const memoize = m as <Fn extends (...args: never[]) => unknown>(
	fn: Fn,
	options?: { cache?: Map<any, any> },
) => Fn

export { memoize, LruCache }
