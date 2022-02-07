import React, { useEffect, useState } from 'react'
import * as HeroIcons from '@heroicons/react/outline'
import clsx from 'clsx'
import {
	KBarProvider,
	KBarPortal,
	KBarPositioner,
	KBarAnimator,
	KBarSearch,
	KBarResults,
	useMatches,
	useKBar,
	useRegisterActions,
} from 'kbar'

function Icon({ name, ...props }) {
	const { ...icons } = HeroIcons
	const HeroIcon = icons[name] ? icons[name] : icons['SearchIcon']

	return <HeroIcon {...props} />
}

function RenderResults() {
	const { results } = useMatches()

	return (
		<div className="vtw-pb-2">
			<KBarResults
				items={results}
				onRender={({ item, active }) =>
					typeof item === 'string' ? (
						<p
							className={clsx(
								'vtw-text-[11px] vtw-font-bold vtw-uppercase',
								'vtw-pt-4 vtw-pb-1 vtw-px-2',
								'vtw-text-zinc-400 dark:vtw-text-neutral-500'
							)}
						>
							{item}
						</p>
					) : (
						<div
							className={clsx(
								'vtw-flex vtw-items-center vtw-gap-2',
								'vtw-text-sm vtw-text-gray-800 dark:vtw-text-neutral-300',
								'vtw-p-2',
								'vtw-mx-2',
								'vtw-rounded-lg',
								active && 'vtw-bg-neutral-200 dark:vtw-bg-neutral-600'
							)}
						>
							<div
								className={clsx(
									'vtw-h-5 vtw-w-5',
									active
										? 'vtw-text-gray-800 dark:vtw-text-neutral-200'
										: 'vtw-text-gray-600 dark:vtw-text-neutral-400'
								)}
							>
								<Icon name={item.icon} />
							</div>
							<div className="vtw-flex vtw-justify-between vtw-gap-3 vtw-flex-1">
								<div className="vtw-flex vtw-flex-col vtw-gap-1 vtw-flex-1 vtw-justify-center">
									<p
										className={clsx(
											'vtw-leading-none vtw-m-0',
											active && 'dark:vtw-text-neutral-50'
										)}
									>
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
					)
				}
			/>
		</div>
	)
}

function Portal() {
	const [actions, setActions] = useState([])
	const { query } = useKBar()

	useRegisterActions(actions, [actions])

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
					perform: () => (window.location = link.url),
				}))

				setActions(actions)
			})
	}, [])

	return (
		<>
			<KBarPortal>
				<KBarPositioner className="vtw-bg-neutral-900/20 vtw-z-[9999]">
					<KBarAnimator
						className={clsx(
							'vtw-bg-zinc-50 dark:vtw-bg-neutral-800',
							'vtw-rounded-lg vtw-overflow-hidden vtw-shadow-2xl',
							'vtw-border vtw-border-solid vtw-border-zinc-200 dark:vtw-border-none',
							'vtw-max-w-lg vtw-w-full'
						)}
					>
						<KBarSearch
							className={clsx(
								'vtw-bg-transparent',
								'vtw-w-full',
								'vtw-px-4 vtw-py-3',
								'vtw-border-none',
								'dark:vtw-text-neutral-300 dark:placeholder:vtw-text-neutral-500',
								'focus:vtw-border-none focus:vtw-outline-none focus:vtw-ring-0'
							)}
						/>
						<RenderResults />
					</KBarAnimator>
				</KBarPositioner>
			</KBarPortal>

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
				onClick={query.toggle}
			>
				<Icon name="TerminalIcon" className="vtw-h-5 vtw-w-5" />
			</button>
		</>
	)
}

export default function Palette() {
	return (
		<KBarProvider>
			<Portal />
		</KBarProvider>
	)
}
