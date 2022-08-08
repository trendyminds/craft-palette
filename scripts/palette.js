import React, { useEffect, useRef, useState } from 'react'
import * as HeroIcons from '@heroicons/react/outline'
import clsx from 'clsx'
import { useHotkeys } from 'react-hotkeys-hook'
import useOnClickOutside from 'use-onclickoutside'

function Icon({ name, ...props }) {
	const { ...icons } = HeroIcons
	const HeroIcon = icons[name] ? icons[name] : icons['SearchIcon']

	return <HeroIcon {...props} />
}

export default function Palette() {
	const modal = useRef(null)
	const list = useRef(null)
	const [isOpen, setIsOpen] = useState(false)
	const [query, setQuery] = useState('')
	const [options, setOptions] = useState([])
	const [focus, setFocus] = useState(0)
	useOnClickOutside(modal, () => setIsOpen(false))

	useHotkeys(
		'ctrl+k, command+k',
		() => {
			setIsOpen((prevStatus) => !prevStatus)
			setQuery('')
		},
		{ enableOnTags: ['INPUT'] }
	)
	useHotkeys(
		'esc',
		() => {
			setIsOpen(false)
			setQuery('')
		},
		{ enableOnTags: ['INPUT'] }
	)

	useEffect(() => {
		if (!options || !list.current) {
			return
		}

		// list.current.querySelectorAll('a')[focus].scrollIntoView({ block: 'end' })
	}, [focus])

	useEffect(() => {
		fetch('/actions/palette/actions')
			.then((res) => res.json())
			.then((data) => {
				setOptions(data)
			})
	}, [])

	return (
		<>
			{isOpen && (
				<div
					className={clsx(
						'vtw-bg-neutral-900/20 vtw-z-[9999] vtw-fixed vtw-inset-0 vtw-h-full vtw-w-full',
						'vtw-flex vtw-justify-center vtw-items-start'
					)}
				>
					<div
						ref={modal}
						className={clsx(
							'vtw-bg-zinc-50 dark:vtw-bg-neutral-800',
							'vtw-rounded-lg vtw-overflow-hidden vtw-shadow-2xl',
							'vtw-border vtw-border-solid vtw-border-zinc-200 dark:vtw-border-none',
							'vtw-max-w-lg vtw-w-full',
							'vtw-translate-y-40'
						)}
					>
						<input
							type="text"
							value={query}
							onInput={({ target }) => {
								setQuery(target.value)
								setFocus(0)
							}}
							placeholder="Search"
							className={clsx(
								'vtw-w-full vtw-font-sans vtw-py-3 vtw-px-5 vtw-text-base',
								'vtw-border-none vtw-bg-transparent vtw-outline-none focus:vtw-border-none !vtw-ring-0 !vtw-shadow-none'
							)}
							autoFocus
						/>
						<div
							className={clsx(
								'vtw-max-h-[400px] vtw-overflow-scroll vtw-transition-all'
							)}
							ref={list}
						>
							{options
								.filter(
									(option) =>
										option.name.toLowerCase().includes(query.toLowerCase()) ||
										option.subtitle.toLowerCase().includes(query.toLowerCase())
								)
								.map((option, index) => {
									const isActive = index === focus
									const isLast = index + 1 === options.length
									return (
										<a
											key={option.url}
											className={clsx(
												'vtw-flex vtw-items-center vtw-gap-2',
												'vtw-font-sans vtw-text-sm vtw-text-gray-800 dark:vtw-text-neutral-300',
												'vtw-p-2 vtw-mx-2',
												'vtw-rounded-lg',
												'hover:vtw-no-underline',
												isLast && 'vtw-mb-2',
												isActive && 'vtw-bg-neutral-200 dark:vtw-bg-neutral-600'
											)}
											onMouseEnter={() => setFocus(index)}
											onMouseLeave={() => setFocus(null)}
											href={option.url}
										>
											<Icon
												name={option.icon}
												className={clsx(
													'vtw-h-5 vtw-w-5',
													'vtw-text-gray-600 dark:vtw-text-neutral-400',
													isActive
														? 'vtw-text-gray-800 dark:vtw-text-neutral-200'
														: 'vtw-text-gray-600 dark:vtw-text-neutral-400'
												)}
											/>
											<div className={clsx('vtw-flex vtw-flex-col vtw-gap-1')}>
												<span
													className={clsx(
														'vtw-block vtw-leading-none vtw-m-0 vtw-font-sans',
														isActive && 'dark:vtw-text-neutral-50'
													)}
												>
													{option.name}
												</span>
												{option.subtitle && (
													<span
														className={clsx(
															'vtw-block vtw-leading-none vtw-text-xs vtw-text-gray-500 dark:vtw-text-neutral-400 vtw-m-0 vtw-font-sans'
														)}
													>
														{option.subtitle}
													</span>
												)}
											</div>
										</a>
									)
								})}
						</div>
					</div>
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
