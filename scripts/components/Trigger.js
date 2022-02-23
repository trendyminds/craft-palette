import React from 'react'
import clsx from 'clsx'
import { usePaletteContext } from './Context'
import Icon from './Icon'

export default function Trigger() {
	const { open, setOpen } = usePaletteContext()

	return (
		<button
			className={clsx(
				'vtw-fixed vtw-bottom-0 vtw-left-0',
				'vtw-mb-4 vtw-ml-4',
				'vtw-flex vtw-items-center vtw-justify-center',
				'vtw-backdrop-blur-md vtw-shadow vtw-rounded-full',
				'vtw-bg-zinc-50/70 dark:vtw-bg-neutral-800/90',
				'dark:vtw-text-neutral-300',
				'vtw-h-8 vtw-w-8 vtw-z-[9999]',
				'vtw-cursor-pointer',
				'vtw-transition-transform hover:vtw-scale-110 active:vtw-scale-90'
			)}
			onClick={() => setOpen(!open)}
		>
			<Icon name="TerminalIcon" className="vtw-h-5 vtw-w-5" />
		</button>
	)
}
