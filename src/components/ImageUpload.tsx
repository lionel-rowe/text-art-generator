import { ChangeEvent, FC, useCallback, useRef } from 'react'
import { toast } from '../ui/toast'
import { readFile } from '../utils/loaders'
import { useExpandedHitBoxOnDrag } from '../hooks/useExpandedHitBoxOnDrag'

export type FileAttrs = {
	fileName: string
	src: string
}

export const ImageUpload: FC<
	FileAttrs & {
		handleUpload: (fileAttrs: FileAttrs) => void
	}
> = ({ handleUpload, fileName, src }) => {
	const fileUploadInputRef = useRef<HTMLInputElement>(null)

	useExpandedHitBoxOnDrag(fileUploadInputRef)

	const handleFileUpload = useCallback(
		async (e: ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files?.[0]

			if (!file) {
				return
			} else if (file.type.split('/')[0] !== 'image') {
				toast.failure('Must be an image file type')

				return
			}

			handleUpload({
				fileName: file.name,
				src: await readFile(file),
			})
		},
		[handleUpload],
	)

	return (
		<div className='form-row file-upload'>
			<div className='interactive'>
				<label htmlFor='file' title='Upload an image'>
					<div>
						<div className='label'>Image file</div>
						<button
							className='btn'
							type='button'
							// captures click-like keyboard events (space, enter, etc.)
							onClick={() => fileUploadInputRef.current?.click()}
						>
							Upload
						</button>
						<input
							ref={fileUploadInputRef}
							id='file'
							type='file'
							onChange={handleFileUpload}
							tabIndex={-1}
						/>
						<span className='file-name'>{fileName}</span>
					</div>
					<div>
						<img className='thumbnail' src={src} alt={fileName} />
					</div>
				</label>
			</div>
		</div>
	)
}
