import React, { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { useHotkeys } from 'react-hotkeys-hook'
import Icon from './icon'

export default function Modal() {
	const results = useRef(null)
	const [query, setQuery] = useState('')
	const [options, setOptions] = useState([])
	const [focus, setFocus] = useState(0)

	useHotkeys(
		'up',
		() => {
			setFocus((prevState) => {
				// Prevent user from focusing above the top-most item
				if (prevState === 0) {
					return 0
				}

				const newFocus = prevState - 1

				results.current
					.querySelectorAll('a')
					[newFocus].scrollIntoView({ block: 'center' })

				return newFocus
			})
		},
		{ enableOnTags: ['INPUT'] }
	)

	useHotkeys(
		'down',
		() => {
			setFocus((prevState) => {
				const newFocus = prevState + 1

				results.current
					.querySelectorAll('a')
					[newFocus].scrollIntoView({ block: 'center' })

				return newFocus
			})
		},
		{ enableOnTags: ['INPUT'] }
	)

	// Open in same window if opening with enter key
	useHotkeys(
		'enter',
		() => {
			const url = focusedElement().getAttribute('href')
			window.location = url
		},
		{ enableOnTags: ['INPUT'] }
	)

	// Open in new window if using cmd+enter on the link
	useHotkeys(
		'cmd+enter',
		() => {
			const url = focusedElement().getAttribute('href')
			window.open(url, '_blank')
		},
		{ enableOnTags: ['INPUT'] }
	)

	function focusedElement() {
		return results.current.querySelectorAll('a')[focus]
	}

	useEffect(() => {
		fetch('/actions/palette/actions')
			.then((res) => res.json())
			.then((data) => {
				setOptions(data)
			})
	}, [])

	return (
		<div
			className={clsx(
				'vtw-bg-zinc-50 dark:vtw-bg-neutral-800',
				'vtw-rounded-lg vtw-overflow-hidden vtw-shadow-2xl',
				'vtw-border vtw-border-solid vtw-border-zinc-200 dark:vtw-border-none',

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
				ref={results}
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
	)
}
