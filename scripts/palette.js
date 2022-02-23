import React, { useEffect, useState, useRef, useCallback } from 'react'
import * as HeroIcons from '@heroicons/react/outline'
import clsx from 'clsx'
import { SearchIcon } from '@heroicons/react/solid'
import FocusTrap from 'focus-trap-react'
import { ExclamationIcon, SupportIcon } from '@heroicons/react/outline'

function Icon({ name, ...props }) {
	const { ...icons } = HeroIcons
	const HeroIcon = icons[name] ? icons[name] : icons['SearchIcon']
	return <HeroIcon {...props} />
}

function Palette() {
	const [open, setOpen] = useState(true)
	const [rawQuery, setRawQuery] = useState('')
	const [actions, setActions] = useState([])
	const [active, setActive] = useState(null)

	useEffect(() => {
		function onKeydown(event) {
			if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
				setOpen(!open)
			}
			if (event.key === 'Escape') {
				setOpen(false)
			}
		}
		window.addEventListener('keydown', onKeydown)
		return () => {
			window.removeEventListener('keydown', onKeydown)
		}
	}, [open])

	useEffect(() => {
		open && document.body.style.overflow === 'hidden'
		!open && document.body.style.overflow === 'unset'
	}, [open])

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

	const handleRoute = (event, item) => {
		setOpen(false)
		return event.ctrlKey || event.metaKey
			? window.open(item.id, '_blank')
			: (window.location = item.id)
	}

	const query = rawQuery.toLowerCase().replace(/^[#>]/, '')
	const filteredActions = actions.filter((action) =>
		action.name.toLowerCase().includes(query)
	)

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

	function handleMouseOver(event) {
		const el = event.currentTarget
		return el.focus()
	}

	console.log(active?.id)

	return (
		<>
			{/* Palette Open Button on the bottom left */}
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

			{/* Palette Modal */}
			{open && (
				<FocusTrap active={open}>
					{/* Overlay */}
					<div
						onClick={() => setOpen(false)}
						className={clsx(
							'vtw-absolute vtw-inset-0 vtw-z-[9999] vtw-pt-20 vtw-p-4 vtw-sm:p-6 vtw-md:p-20 vtw-flex vtw-flex-col vtw-items-center vtw-bg-gray-500 vtw-bg-opacity-25 vtw-transition-opacity',
							'dark:vtw-bg-gray-900/75'
						)}
					>
						<nav
							onClick={(e) => e.stopPropagation()}
							className={clsx(
								'vtw-overflow-y-scroll vtw-px-3 vtw-relative vtw-text-sm  vtw-max-h-[40rem] vtw-max-w-xl vtw-w-full vtw-transform vtw-rounded-xl vtw-bg-white vtw-shadow-2xl vtw-ring-1 vtw-ring-black vtw-ring-opacity-5 vtw-transition-all',
								'dark:vtw-bg-gray-900'
							)}
						>
							<SearchIcon
								className="vtw-pointer-events-none vtw-z-[1000] vtw-absolute vtw-top-4 vtw-left-6 vtw-h-5 vtw-w-5 vtw-text-gray-400"
								aria-hidden="true"
							/>
							<input
								className={clsx(
									'vtw-h-12 vtw-w-[fill-available] vtw-pl-10 vtw-border-b vtw-border-gray-50 vtw-border-0 vtw-bg-transparent vtw-text-sm vtw-text-gray-800 vtw-placeholder-gray-400 focus:vtw-ring-0 focus:vtw-outline-none vtw-bg-white vtw-mb-2',
									'dark:vtw-placeholder-neutral-400 dark:vtw-text-white'
								)}
								placeholder="Search..."
								onKeyDown={handleKeyDown}
								onChange={(e) => setRawQuery(e.target.value)}
							/>
							{filteredActions.map((item, idx) => (
								<button
									onMouseOver={handleMouseOver}
									onKeyDown={handleKeyDown}
									id={idx}
									onClick={(e) => handleRoute(e, item)}
									key={item.id}
									value={item}
									className={clsx(
										'vtw-flex vtw-items-center vtw-gap-3 vtw-group',
										'vtw-text-sm vtw-font-light vtw-text-slate-600 vtw-tracking-wide vtw-border-none focus:vtw-bg-white',
										'vtw-p-3 vtw-py-3 vtw-my-1 vtw-w-full vtw-text-left',
										'vtw-select-none vtw-rounded-lg',
										' focus:vtw-outline-none focus:vtw-ring-0 focus:vtw-outline-0 ',
										'dark:vtw-text-neutral-400 dark:focus:vtw-bg-gray-800 dark:focus:vtw-text-white',
										'vtw-transition-all focus:vtw-bg-gray-100'
									)}
								>
									<div className={clsx('vtw-h-5 vtw-w-5 vtw-text-slate-400')}>
										<Icon name={item.icon} />
									</div>
									<div className="vtw-flex vtw-justify-between vtw-gap-3 vtw-flex-1">
										<div className="vtw-flex vtw-flex-col vtw-gap-1 vtw-flex-1 vtw-justify-center">
											<p
												className={clsx(
													'vtw-leading-none vtw-capitalize vtw-m-0'
												)}
											>
												{item.name}
												{item.subtitle && (
													<span className=""> / {item.subtitle}</span>
												)}
											</p>
										</div>
										<div>
											<p className="group-focus:vtw-opacity-100 vtw-opacity-0 vtw-transition-opacity">
												Jump to...
											</p>
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
								</button>
							))}

							{rawQuery === '?' && (
								<div className="vtw-py-4 vtw-px-6 vtw-text-center vtw-text-sm vtw-sm:px-14">
									<SupportIcon
										className="vtw-mx-auto vtw-h-6 vtw-w-6 vtw-text-gray-400"
										aria-hidden="true"
									/>
									<p
										className={clsx(
											'vtw-mt-4 vtw-font-semibold vtw-text-gray-900',
											'dark:vtw-text-white'
										)}
									>
										Help with searching
									</p>
									<p className="vtw-mt-2 vtw-text-gray-500">
										Use this tool to quickly search for users and projects
										across our entire platform. You can also use the search
										modifiers found in the footer below to limit the results to
										just users or projects.
									</p>
								</div>
							)}

							{query !== '' &&
								rawQuery !== '?' &&
								filteredActions.length === 0 && (
									<div className="vtw-py-4 vtw-px-6 vtw-text-center vtw-text-sm vtw-sm:px-14">
										<ExclamationIcon
											className="vtw-mx-auto vtw-h-6 vtw-w-6 vtw-text-gray-400"
											aria-hidden="true"
										/>
										<p
											className={clsx(
												'vtw-mt-4 vtw-font-semibold vtw-text-gray-900',
												'dark:vtw-text-white'
											)}
										>
											No results found
										</p>
										<p className="vtw-mt-2 vtw-text-gray-500">
											We couldn’t find anything with that term. Please try
											again.
										</p>
									</div>
								)}
						</nav>
					</div>
				</FocusTrap>
			)}
		</>
	)
}

export default Palette
