import React, { useState } from 'react'
import clsx from 'clsx'
import { useHotkeys } from 'react-hotkeys-hook'
import Icon from './icon'
import Modal from './modal'

export default function Palette() {
	const [isOpen, setIsOpen] = useState(false)

	useHotkeys(
		'ctrl+k, command+k',
		() => {
			setIsOpen((prevStatus) => !prevStatus)
		},
		{ enableOnTags: ['INPUT'] }
	)
	useHotkeys(
		'esc',
		() => {
			setIsOpen(false)
		},
		{ enableOnTags: ['INPUT'] }
	)

	return (
		<>
			{isOpen && (
				<div
					className={clsx(
						'vtw-bg-neutral-900/20 vtw-z-[9999] vtw-fixed vtw-inset-0 vtw-h-full vtw-w-full',
						'vtw-flex vtw-justify-center vtw-items-start'
					)}
				>
					<Modal />
				</div>
			)}

			<button
				className={clsx(
					'vtw-fixed vtw-bottom-0 vtw-left-0',
					'vtw-mb-4 vtw-ml-4',
					'vtw-flex vtw-items-center vtw-justify-center',
					'vtw-backdrop-blur-md vtw-shadow vtw-rounded-full',
					'vtw-bg-zinc-50/70 dark:vtw-bg-neutral-800/90',
					'dark:vtw-text-neutral-300',
					'vtw-h-8 vtw-w-8 vtw-z-[100]',
					'vtw-cursor-pointer',
					'vtw-border-0',
					'vtw-transition-transform hover:vtw-scale-110 active:vtw-scale-90'
				)}
			>
				<Icon name="TerminalIcon" className="vtw-h-5 vtw-w-5" />
			</button>
		</>
	)
}
