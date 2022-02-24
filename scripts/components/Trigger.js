import React from 'react'
import clsx from 'clsx'
import { usePaletteContext } from './Context'
import Icon from './Icon'

export default function Trigger() {
	const { open, setOpen } = usePaletteContext()

	return (
		<button
			className={clsx(
				'cp-fixed cp-bottom-0 cp-left-0',
				'cp-mb-4 cp-ml-4',
				'cp-flex cp-items-center cp-justify-center',
				'cp-backdrop-blur-md cp-shadow cp-rounded-full',
				'cp-bg-zinc-50/70 dark:cp-bg-neutral-800/90',
				'dark:cp-text-neutral-300',
				'cp-h-8 cp-w-8 cp-z-[9999]',
				'cp-cursor-pointer',
				'cp-transition-transform hover:cp-scale-110 active:cp-scale-90'
			)}
			onClick={() => setOpen(!open)}
		>
			<Icon name="TerminalIcon" className="cp-h-5 cp-w-5" />
		</button>
	)
}
