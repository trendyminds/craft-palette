import React, { useEffect, useState, useRef, useCallback } from 'react'
import * as HeroIcons from '@heroicons/react/outline'
import clsx from 'clsx'
import { SearchIcon } from '@heroicons/react/solid'
import useOutsideClick from './hooks/useOutsideClick'
import FocusTrap from 'focus-trap-react'
import { ExclamationIcon, SupportIcon } from '@heroicons/react/outline'

function Icon({ name, ...props }) {
	const { ...icons } = HeroIcons
	const HeroIcon = icons[name] ? icons[name] : icons['SearchIcon']
	return <HeroIcon {...props} />
}

function TwPalette() {
	const [open, setOpen] = useState(true)
	const [theme, setTheme] = useState(false)
	const [active, setActive] = useState(0)
	const [keyPressed, setKeyPressed] = useState('')
	const [rawQuery, setRawQuery] = useState('')
	const [actions, setActions] = useState([])
	const containerRef = useRef(null)

	useOutsideClick(containerRef, () => setOpen(false))

	const handleUserKeyPress = useCallback(
		(event) => {
			const { key } = event
			setKeyPressed(key)
			if ((keyPressed === 'Meta' || keyPressed === 'Control') && key === 'k') {
				setOpen(!open)
			}
			if (key === 'Escape') {
				setOpen(false)
			}
		},
		[keyPressed]
	)

	useEffect(() => {
		window.addEventListener('keydown', handleUserKeyPress)
		return () => {
			window.removeEventListener('keydown', handleUserKeyPress)
		}
	}, [handleUserKeyPress])

	useEffect(() => {
		fetch('/actions/palette/actions')
			.then((res) => res.json())
			.then((data) => {
				const actions = data.map((link) => ({
					id: link.url,
					name: link.name,
					icon: link.icon,
					subtitle: link.subtitle,
					section: link.section,
					badgeCount: link?.badgeCount,
				}))
				setActions(actions)
			})
	}, [])

	const query = rawQuery.toLowerCase().replace(/^[#>]/, '')

	const filteredActions = actions.filter((action) =>
		action.name.toLowerCase().includes(query)
	)

	const handleRoute = (event, item) => {
		setOpen(false)
		if (event.ctrlKey || event.metaKey) {
			return window.open(item.id, '_blank')
		}
		return (window.location = item.id)
	}

	return (
		<>
			{open && (
				<div className="vtw-fixed vtw-inset-0 vtw-z-[99999] vtw-p-4 vtw-sm:p-6 vtw-md:p-20">
					<div className="vtw-fixed vtw-inset-0 vtw-bg-gray-500 vtw-bg-opacity-25 vtw-transition-opacity"></div>
					{/* Content Here */}
					<FocusTrap active={open}>
						<article
							ref={containerRef}
							className="vtw-mx-auto vtw-flex vtw-flex-col vtw-max-h-[40rem] vtw-overflow-auto vtw-max-w-xl vtw-transform vtw-divide-y vtw-divide-gray-100 vtw-rounded-xl vtw-bg-white vtw-shadow-2xl vtw-ring-1 vtw-ring-black vtw-ring-opacity-5 vtw-transition-all"
						>
							{/* Search Bar */}
							<header className="relative">
								<SearchIcon
									className="vtw-pointer-events-none vtw-absolute vtw-top-3.5 vtw-left-4 vtw-h-5 vtw-w-5 vtw-text-gray-400"
									aria-hidden="true"
								/>
								<input
									className="vtw-h-12 vtw-w-full vtw-border-0 vtw-bg-transparent vtw-pl-11 vtw-pr-4 vtw-text-sm vtw-text-gray-800 vtw-placeholder-gray-400 vtw-focus:ring-0 focus:vtw-border-none focus:vtw-outline-none focus:vtw-ring-0"
									placeholder="Search..."
									onChange={(event) => setRawQuery(event.target.value)}
								/>
							</header>

							{/* List */}
							<main className="vtw-flex-1 vtw-overflow-y-scroll">
								{filteredActions.length > 0 && (
									<ul
										autoFocus
										id="actionElements"
										className="vtw--mx-4 vtw-text-sm vtw-text-gray-700"
									>
										{filteredActions.map((item, idx) => (
											<div
												onClick={(e) => handleRoute(e, item)}
												key={item.id}
												value={item}
												className={clsx(
													'vtw-flex vtw-cursor-pointer vtw-select-none vtw-items-center vtw-px-4 vtw-py-2',
													'hover:vtw-bg-gray-200 vtw-transition-all vtw-duration-200',
													idx === active && 'vtw-bg-gray-200'
												)}
											>
												<div
													className={clsx(
														'vtw-flex vtw-items-center vtw-gap-2',
														'vtw-text-sm vtw-text-gray-800 dark:vtw-text-neutral-300',
														'vtw-p-2',
														'vtw-mx-2',
														'vtw-rounded-lg'
													)}
												>
													<div className={clsx('vtw-h-5 vtw-w-5')}>
														<Icon name={item.icon} />
													</div>
													<div className="vtw-flex vtw-justify-between vtw-gap-3 vtw-flex-1">
														<div className="vtw-flex vtw-flex-col vtw-gap-1 vtw-flex-1 vtw-justify-center">
															<p className={clsx('vtw-leading-none vtw-m-0')}>
																{item.name}
															</p>
															{item.subtitle && (
																<p className="vtw-leading-none vtw-text-xs vtw-text-gray-500 dark:vtw-text-neutral-400 vtw-m-0">
																	{item.subtitle}
																</p>
															)}
														</div>

														{item?.badgeCount && (
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
																	{item?.badgeCount}
																</p>
															</div>
														)}
													</div>
												</div>
											</div>
										))}
									</ul>
								)}

								{rawQuery === '?' && (
									<div className="vtw-pb-14 vtw-px-6 vtw-text-center vtw-text-sm vtw-sm:px-14">
										<SupportIcon
											className="vtw-mx-auto vtw-h-6 vtw-w-6 vtw-text-gray-400"
											aria-hidden="true"
										/>
										<p className="vtw-mt-4 vtw-font-semibold vtw-text-gray-900">
											Help with searching
										</p>
										<p className="vtw-mt-2 vtw-text-gray-500">
											Use this tool to quickly search for users and projects
											across our entire platform. You can also use the search
											modifiers found in the footer below to limit the results
											to just users or projects.
										</p>
									</div>
								)}

								{query !== '' &&
									rawQuery !== '?' &&
									filteredActions.length === 0 && (
										<div className="vtw-py-14 vtw-px-6 vtw-text-center vtw-text-sm vtw-sm:px-14">
											<ExclamationIcon
												className="vtw-mx-auto vtw-h-6 vtw-w-6 vtw-text-gray-400"
												aria-hidden="true"
											/>
											<p className="vtw-mt-4 vtw-font-semibold vtw-text-gray-900">
												No results found
											</p>
											<p className="vtw-mt-2 vtw-text-gray-500">
												We couldn’t find anything with that term. Please try
												again.
											</p>
										</div>
									)}
							</main>

							<footer className="vtw-flex vtw-fixed vtw-bottom-0 vtw-right-0 vtw-left-0 vtw-flex-shrink-0 vtw-mt-auto vtw-flex-wrap vtw-items-center vtw-bg-gray-50 vtw-py-2.5 vtw-px-4 vtw-text-xs vtw-text-gray-700">
								Type{' '}
								<div
									className={clsx(
										'vtw-mx-1 vtw-flex vtw-h-5 vtw-w-5 vtw-items-center vtw-justify-center vtw-rounded vtw-border vtw-bg-white vtw-font-semibold vtw-sm:mx-2',
										rawQuery.startsWith('#')
											? 'vtw-border-gray-300 vtw-text-indigo-600'
											: 'vtw-border-gray-400 vtw-text-gray-900'
									)}
								>
									#
								</div>{' '}
								<span className="vtw-sm:hidden">for projects,</span>
								<span className="vtw-hidden vtw-sm:inline">
									to access projects,
								</span>
								<div
									className={clsx(
										'vtw-mx-1 vtw-flex vtw-h-5 vtw-w-5 vtw-items-center vtw-justify-center vtw-rounded vtw-border vtw-bg-white vtw-font-semibold vtw-sm:mx-2',
										rawQuery.startsWith('>')
											? 'vtw-border-gray-300 vtw-text-indigo-600'
											: 'vtw-border-gray-400 vtw-text-gray-900'
									)}
								>
									&gt;
								</div>{' '}
								for users, and{' '}
								<div
									className={clsx(
										'vtw-mx-1 vtw-flex vtw-h-5 vtw-w-5 vtw-items-center vtw-justify-center vtw-rounded vtw-border vtw-bg-white vtw-font-semibold vtw-sm:mx-2',
										rawQuery === '?'
											? 'vtw-border-indigo-600 vtw-text-indigo-600'
											: 'vtw-border-gray-400 vtw-text-gray-900'
									)}
								>
									?
								</div>{' '}
								for help.
							</footer>
						</article>
					</FocusTrap>
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
					'vtw-h-8 vtw-w-8 vtw-z-[9999]',
					'vtw-cursor-pointer',
					'vtw-transition-transform hover:vtw-scale-110 active:vtw-scale-90'
				)}
				onClick={() => setOpen(!open)}
			>
				<Icon name="TerminalIcon" className="vtw-h-5 vtw-w-5" />
			</button>
		</>
	)
}

export default TwPalette
