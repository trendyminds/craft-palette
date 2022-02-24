import React from 'react'
import clsx from 'clsx'
import { usePaletteContext } from './Context'

export default function Overlay() {
	const { open, setOpen } = usePaletteContext()

	return (
		<div
			onClick={() => setOpen(false)}
			className={clsx(
				'cp-absolute cp-inset-0 cp-w-full cp-h-full cp-bg-gray-500 cp-bg-opacity-25 cp-transition-opacity',
				'dark:cp-bg-gray-900/75'
			)}
		/>
	)
}
