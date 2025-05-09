import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useMemo,
	useState,
} from 'react'
import { getAlphabetScalingData } from './algorithm/charScaling'
import {
	getNormalizedCharDensities,
	getRawCharDensities,
	RawCharDensityData,
} from './algorithm/charDensity'
import { getCharSet } from './algorithm/charSet'
import {
	getCharPixelMatrix,
	CharPixelMatrix,
} from './algorithm/charPixelMatrix'
import { getTextArt } from './algorithm/textArt'
import { loadImage } from './utils/loaders'
import { DEFAULTS } from './data/defaults'
import { alphabetPresets } from './data/alphabets'
import { idb } from './utils/idb'
import { appendInvisible } from './ui/browser'
import { toast } from './ui/toast'
import { Help } from './components/Help'
import { FileAttrs, ImageUpload } from './components/ImageUpload'
import { TextArt } from './components/TextArt'
import { NumberInput } from './components/NumberInput'
import { useRenderToken } from './hooks/useRenderToken'
import { useComplexState } from './hooks/useComplexState'
import { useResponsiveThrottle } from './hooks/useResponsiveThrottle'
import { AspectRatio } from './types/types'
import { useRefGetter } from './hooks/useRefGetter'

export type Status = 'loading' | 'error' | 'loaded'

const { src: defaultSrc, ...defaultConfig } = DEFAULTS

export type Config = typeof defaultConfig

export const App = () => {
	const [status, setStatus] = useState<Status>('loading')

	const [img, setImg] = useState<null | HTMLImageElement>(null)

	const [config, setConfig] = useComplexState(defaultConfig)
	const [src, setSrc] = useState('')

	const [textArt, setTextArt] = useState('')

	const renderToken = useRenderToken()

	const { resolutionX, invert, alphabet, fileName, contrast, brightness } =
		config

	const [darkMode, setDarkMode] = useState(false)

	useEffect(() => {
		Promise.all([
			idb.get('config').then((config) => {
				setConfig({ ...defaultConfig, ...config })
			}),
			idb.get('src').then((src) => {
				setSrc(src || defaultSrc)
			}),
		]).then(() => setStatus('loaded'))
	}, [setConfig])

	useEffect(() => {
		if (status !== 'loaded') return

		idb.set('config', config)
	}, [status, config])

	useEffect(() => {
		if (status !== 'loaded') return

		idb.set('src', src)
	}, [status, src])

	const charSet = useMemo(() => getCharSet(alphabet), [alphabet])

	const aspectRatio = useRefGetter<AspectRatio>(
		() =>
			status === 'loaded'
				? getAlphabetScalingData(charSet).aspectRatio
				: [1, 1],
		[status, charSet],
	)

	const [rawCharValData, setRawCharValData] =
		useResponsiveThrottle<RawCharDensityData>({
			charVals: [],
			min: 0,
			max: 0,
		})

	useEffect(() => {
		if (status !== 'loaded') return

		setRawCharValData(() => getRawCharDensities(charSet))
	}, [status, charSet, setRawCharValData])

	const charVals = useMemo(
		() => getNormalizedCharDensities({ invert })(rawCharValData),
		[invert, rawCharValData],
	)

	useEffect(() => {
		document.documentElement.setAttribute(
			'color-scheme',
			darkMode ? 'dark' : 'light',
		)

		return () => {
			document.documentElement.removeAttribute('color-scheme')
		}
	}, [darkMode])

	const handleUpload = useCallback(
		({ fileName, src }: FileAttrs) => {
			setConfig({ fileName })
			setSrc(src)
		},
		[setConfig],
	)

	useEffect(() => {
		loadImage(src).then(setImg)
	}, [src])

	const [charPixelMatrix, setCharPixelMatrix] =
		useResponsiveThrottle<CharPixelMatrix>([])

	useEffect(() => {
		if (status !== 'loaded' || !img) return

		setCharPixelMatrix(() => {
			// only after throttled callback to prevent jank
			setDarkMode(invert)

			return getCharPixelMatrix({
				resolutionX,
				img,
				aspectRatio: aspectRatio.current,
				brightness,
				contrast,
				charVals,
			})
		})
	}, [
		status,
		invert,
		brightness,
		contrast,
		charVals,
		setCharPixelMatrix,
		aspectRatio,
		resolutionX,
		img,
	])

	useLayoutEffect(
		() => setTextArt(getTextArt(charPixelMatrix)),
		[charPixelMatrix],
	)

	const reset = useCallback(() => {
		const confirmed = window.confirm(
			'Reset image and settings to defaults?',
		)

		if (!confirmed) return

		// reduce jank
		setStatus('loading')

		setSrc(defaultSrc)
		setConfig(defaultConfig)

		renderToken.rerender()

		setStatus('loaded')
	}, [setConfig, renderToken])

	return status === 'loading' ? (
		<>Loading...</>
	) : (
		<div key={renderToken.value}>
			<div className='panes'>
				<form className='controls' onSubmit={(e) => e.preventDefault()}>
					<h1>Text Art Generator</h1>

					<ImageUpload {...{ fileName, src, handleUpload }} />

					<div className='form-row'>
						<NumberInput
							label='Width (characters)'
							configItem={{ resolutionX }}
							setConfig={setConfig}
							min={10}
							max={300}
							step={1}
						/>
					</div>

					<div className='form-row'>
						<label htmlFor='invert'>Invert (light on dark)?</label>

						<input
							id='invert'
							type='checkbox'
							defaultChecked={invert}
							onChange={(e) => {
								setConfig({ invert: e.currentTarget.checked })
							}}
						/>
					</div>

					<div className='form-row'>
						<label htmlFor='alphabet'>Alphabet</label>

						<Help
							tooltip={`Choose one of the presets or roll your own.\n\nFor best results, make sure to use characters that are all the same width when displayed in a monospace font. For example, "ABCabc" is fine, and so is "一二三四五", but "abc一二三" isn't.`}
						/>

						<select
							onChange={(e) => {
								const { value } = e.currentTarget

								if (value) {
									setConfig({ alphabet: value })
								}
							}}
							value={
								alphabetPresets.find(
									(p) => p.content === alphabet,
								)
									? alphabet
									: ''
							}
						>
							<option key='' value='' disabled>
								-- Presets --
							</option>

							{Object.entries(alphabetPresets).map(([k, v]) => (
								<option key={k} value={v.content}>
									{v.name}
								</option>
							))}
						</select>

						<textarea
							id='alphabet'
							value={alphabet}
							onChange={(e) =>
								setConfig({ alphabet: e.currentTarget.value })
							}
						/>
					</div>

					<div className='form-row'>
						<NumberInput
							label='Brightness'
							configItem={{ brightness }}
							setConfig={setConfig}
							min={0}
							max={100}
							step={1}
						/>

						<NumberInput
							label='Contrast'
							configItem={{ contrast }}
							setConfig={setConfig}
							min={0}
							max={100}
							step={1}
						/>
					</div>

					<hr />

					<div className='form-row form-buttoms'>
						<button
							type='button'
							onClick={() => {
								const t = appendInvisible('textarea')

								t.value = textArt

								t.select()

								const succeeded = document.execCommand('copy')

								if (succeeded) {
									toast.success('Copied to clipboard')
								} else {
									toast.failure('Failed to copy')
								}

								t.remove()
							}}
						>
							Copy text art
						</button>

						<button type='button' onClick={reset}>
							Reset to defaults
						</button>
					</div>
				</form>

				<TextArt content={textArt} />
			</div>
		</div>
	)
}
