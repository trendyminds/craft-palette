import React from 'react'
import clsx from 'clsx'
import Icon from './Icon'
import { usePaletteContext } from './Context'

export default function Search() {
	const { setRawQuery } = usePaletteContext()

	function handleKeyDown(event) {
		const el = event.currentTarget
		switch (event.key) {
			case 'Escape':
				return setOpen(false)
			case 'ArrowDown':
				return el?.nextSibling?.focus()
			case 'ArrowUp':
				return el?.previousSibling?.focus()
			default:
				return
		}
	}

	return (
		<div className="cp-sticky cp-px-6 cp-top-0 cp-bg-white dark:cp-bg-gray-900 cp-border-b cp-border-solid cp-flex cp-items-center cp-gap-3">
			<Icon
				name="SearchIcon"
				className="cp-pointer-events-none cp-h-5 cp-w-5 cp-text-gray-400"
				aria-hidden="true"
			/>
			<input
				className={clsx(
					'cp-py-4 cp-w-[fill-available] cp-border-0',
					'cp-bg-transparent cp-text-sm cp-text-gray-800 cp-placeholder-gray-400 cp-bg-white',
					'focus:cp-ring-0 focus:cp-outline-none',
					'dark:cp-placeholder-neutral-400 dark:cp-text-white'
				)}
				placeholder="Search..."
				onKeyDown={handleKeyDown}
				onChange={(e) => setRawQuery(e.target.value)}
			/>
		</div>
	)
}
