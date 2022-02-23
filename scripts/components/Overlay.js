import React from 'react'
import clsx from 'clsx'
import { usePaletteContext } from './Context'

export default function Overlay() {
	const { open, setOpen } = usePaletteContext()

	return (
		<div
			onClick={() => setOpen(false)}
			className={clsx(
				'vtw-absolute vtw-inset-0 vtw-w-full vtw-h-full vtw-bg-gray-500 vtw-bg-opacity-25 vtw-transition-opacity',
				'dark:vtw-bg-gray-900/75'
			)}
		/>
	)
}
