import React from 'react'
import clsx from 'clsx'
import { SearchIcon } from '@heroicons/react/solid'
import { ExclamationIcon, SupportIcon } from '@heroicons/react/outline'
import { usePaletteContext } from './Context'
import Icon from './Icon'

export default function Modal() {
	const { setOpen, rawQuery, setRawQuery, actions } = usePaletteContext()

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

	return (
		<nav
			className={clsx(
				'vtw-overflow-y-scroll vtw-px-3 vtw-relative vtw-text-sm  vtw-max-h-[40rem] vtw-max-w-xl vtw-w-full vtw-transform vtw-rounded-xl vtw-bg-white vtw-shadow-2xl vtw-ring-1 vtw-ring-black vtw-ring-opacity-5 vtw-transition-all',
				'dark:vtw-bg-gray-900'
			)}
		>
			<form className="vtw-sticky vtw-top-0 vtw-bg-white dark:vtw-bg-gray-900">
				<SearchIcon
					className="vtw-pointer-events-none vtw-z-[1000] vtw-absolute vtw-top-4 vtw-left-3 vtw-h-5 vtw-w-5 vtw-text-gray-400"
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
			</form>
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
							<p className={clsx('vtw-leading-none vtw-capitalize vtw-m-0')}>
								{item.name}
								{item.subtitle && <span className=""> / {item.subtitle}</span>}
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
						Use this tool to quickly search for users and projects across our
						entire platform. You can also use the search modifiers found in the
						footer below to limit the results to just users or projects.
					</p>
				</div>
			)}

			{query !== '' && rawQuery !== '?' && filteredActions.length === 0 && (
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
						We couldn’t find anything with that term. Please try again.
					</p>
				</div>
			)}
		</nav>
	)
}
