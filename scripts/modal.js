import React, { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { useHotkeys } from 'react-hotkeys-hook'
import Icon from './icon'

export default function Modal() {
	const results = useRef(null)
	const [query, setQuery] = useState('')
	const [options, setOptions] = useState([])
	const [filteredOptions, setFilteredOptions] = useState([])
	const [focus, setFocus] = useState(0)

	useHotkeys(
		'up',
		(ev) => {
			// Prevent keyboard from modifying the input field
			ev.preventDefault()

			setFocus((prevState) => {
				// Prevent user from focusing above the top-most item
				if (prevState === 0) {
					return 0
				}

				// Get the new focus
				const newFocus = prevState - 1

				// Scroll to the element in the list
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
		(ev) => {
			// Prevent keyboard from modifying the input field
			ev.preventDefault()

			setFocus((prevState) => {
				// Get the new focus
				const newFocus = prevState + 1

				// Prevent the user from scrolling past the options
				if (newFocus === filteredOptions.length) {
					return prevState
				}

				// Scroll to the element in the list
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
		// If a custom baseUrl was set we need to use that. Otherwise use the webroot
		let url = '/'

		if (window.palette && window.palette.baseUrl) {
			url = `${window.palette.baseUrl}/`

			// If URL has multiple slashes, remove them all and add a single slash
			url = url.replace(/\/+$/, '/')
		}

		fetch(`${url}actions/palette/actions`)
			.then((res) => res.json())
			.then((data) => {
				setOptions(data)
				setFilteredOptions(data)
			})
	}, [])

	// Filter the results based on the user's query
	useEffect(() => {
		if (query === '') {
			setFilteredOptions(options)
			return
		}

		setFilteredOptions(() => {
			return options.filter(
				(option) =>
					option.name.toLowerCase().includes(query.toLowerCase()) ||
					option.subtitle.toLowerCase().includes(query.toLowerCase())
			)
		})
	}, [query])

	return (
		<>
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
					'vtw-border-none vtw-bg-transparent vtw-outline-none focus:vtw-border-none !vtw-ring-0 !vtw-shadow-none',
					'dark:vtw-text-zinc-300'
				)}
				autoFocus
			/>
			<div
				className={clsx(
					'vtw-max-h-[400px] vtw-overflow-scroll vtw-transition-all'
				)}
				ref={results}
			>
				{filteredOptions.map((option, index) => {
					const isActive = index === focus
					const isLast = index + 1 === filteredOptions.length
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
							<div
								className={clsx(
									'vtw-flex vtw-items-center vtw-justify-between vtw-gap-2',
									'vtw-flex-1'
								)}
							>
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

								{option?.badgeCount && (
									<div
										className={clsx(
											'vtw-bg-neutral-600 dark:vtw-bg-neutral-400',
											'vtw-h-5 vtw-w-5 vtw-rounded-full',
											'vtw-flex vtw-items-center vtw-justify-center vtw-self-center'
										)}
									>
										<p
											className={clsx(
												'vtw-text-[10px] vtw-leading-none vtw-font-bold',
												'vtw-text-white dark:vtw-text-neutral-800',
												'vtw-m-0'
											)}
										>
											{option?.badgeCount}
										</p>
									</div>
								)}
							</div>
						</a>
					)
				})}
			</div>
		</>
	)
}
