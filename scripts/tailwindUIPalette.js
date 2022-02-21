import React, { Fragment, useState, useEffect } from 'react'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'
import * as HeroIcons from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/solid'
import { SupportIcon } from '@heroicons/react/outline'

function Icon({ name, ...props }) {
	const { ...icons } = HeroIcons
	const HeroIcon = icons[name] ? icons[name] : icons['SearchIcon']

	return <HeroIcon {...props} />
}

function Hello() {
	const [open, setOpen] = useState(false)
	const [actions, setActions] = useState([])
	const [rawQuery, setRawQuery] = useState('')

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
					perform: (event) => {
						window.location = link.url
					}
				}))

				setActions(actions)
			})
	}, [])


	const query = rawQuery.toLowerCase().replace(/^[#>]/, '')

	const filteredActions = actions.filter((action) =>
		action.name.toLowerCase().includes(query)
	)

	return (
		<>
			<Transition.Root
				show={open}
				as={Fragment}
				afterLeave={() => setRawQuery('')}
			>
				<Dialog
					as="div"
					className="vtw-fixed vtw-inset-0 vtw-z-10 vtw-overflow-y-auto vtw-p-4 vtw-sm:p-6 vtw-md:p-20"
					onClose={setOpen}
				>
					<Transition.Child
						as={Fragment}
						enter="vtw-ease-out vtw-duration-300"
						enterFrom="vtw-opacity-0"
						enterTo="vtw-opacity-100"
						leave="vtw-ease-in vtw-duration-200"
						leaveFrom="vtw-opacity-100"
						leaveTo="vtw-opacity-0"
					>
						<Dialog.Overlay className="vtw-fixed vtw-inset-0 vtw-bg-gray-500 vtw-bg-opacity-25 vtw-transition-opacity" />
					</Transition.Child>

					<Transition.Child
						as={Fragment}
						enter="vtw-ease-out vtw-duration-300"
						enterFrom="vtw-opacity-0 vtw-scale-95"
						enterTo="vtw-opacity-100 vtw-scale-100"
						leave="vtw-ease-in vtw-duration-200"
						leaveFrom="vtw-opacity-100 vtw-scale-100"
						leaveTo="vtw-opacity-0 vtw-scale-95"
					>
						<Combobox
							as="div"
							className="vtw-mx-auto vtw-max-w-xl vtw-transform vtw-divide-y vtw-divide-gray-100 vtw-overflow-hidden vtw-rounded-xl vtw-bg-white vtw-shadow-2xl vtw-ring-1 vtw-ring-black vtw-ring-opacity-5 vtw-transition-all"
							onChange={(item) => item.perform()}
						>
							<div className="relative">
								<SearchIcon
									className="vtw-pointer-events-none vtw-absolute vtw-top-3.5 vtw-left-4 vtw-h-5 vtw-w-5 vtw-text-gray-400"
									aria-hidden="true"
								/>
								<Combobox.Input
									className="vtw-h-12 vtw-w-full vtw-border-0 vtw-bg-transparent vtw-pl-11 vtw-pr-4 vtw-text-sm vtw-text-gray-800 vtw-placeholder-gray-400 vtw-focus:ring-0 focus:vtw-border-none focus:vtw-outline-none focus:vtw-ring-0"
									placeholder="Search..."
									onChange={(event) => setRawQuery(event.target.value)}
								/>
							</div>

							{filteredActions.length > 0 && (
								<Combobox.Options
									static
									className="vtw-max-h-80 vtw-scroll-py-10 vtw-scroll-pb-2 vtw-space-y-4 vtw-overflow-y-auto vtw-pb-2"
								>
									{filteredActions.length > 0 && (
										<li>
											<ul className="vtw--mx-4 vtw-text-sm vtw-text-gray-700">
												{filteredActions.map((item) => (
													<Combobox.Option
														key={item.id}
														value={item}
														className={({ active }) =>
															clsx(
																'vtw-flex vtw-cursor-default vtw-select-none vtw-items-center vtw-px-4 vtw-py-2',
																active && 'vtw-bg-gray-200 vtw-text-white'
															)
														}
													>
														{({ active }) => (
															<div
																className={clsx(
																	'vtw-flex vtw-items-center vtw-gap-2',
																	'vtw-text-sm vtw-text-gray-800 dark:vtw-text-neutral-300',
																	'vtw-p-2',
																	'vtw-mx-2',
																	'vtw-rounded-lg',
																	active &&
																		'vtw-bg-neutral-200 dark:vtw-bg-neutral-600'
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
														)}
													</Combobox.Option>
												))}
											</ul>
										</li>
									)}
								</Combobox.Options>
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
										modifiers found in the footer below to limit the results to
										just users or projects.
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

							<div className="vtw-flex vtw-flex-wrap vtw-items-center vtw-bg-gray-50 vtw-py-2.5 vtw-px-4 vtw-text-xs vtw-text-gray-700">
								Type{' '}
								<kbd
									className={clsx(
										'vtw-mx-1 vtw-flex vtw-h-5 vtw-w-5 vtw-items-center vtw-justify-center vtw-rounded vtw-border vtw-bg-white vtw-font-semibold vtw-sm:mx-2',
										rawQuery.startsWith('#')
											? 'vtw-border-gray-300 vtw-text-indigo-600'
											: 'vtw-border-gray-400 vtw-text-gray-900'
									)}
								>
									#
								</kbd>{' '}
								<span className="vtw-sm:hidden">for projects,</span>
								<span className="vtw-hidden vtw-sm:inline">to access projects,</span>
								<kbd
									className={clsx(
										'vtw-mx-1 vtw-flex vtw-h-5 vtw-w-5 vtw-items-center vtw-justify-center vtw-rounded vtw-border vtw-bg-white vtw-font-semibold vtw-sm:mx-2',
										rawQuery.startsWith('>')
											? 'vtw-border-gray-300 vtw-text-indigo-600'
											: 'vtw-border-gray-400 vtw-text-gray-900'
									)}
								>
									&gt;
								</kbd>{' '}
								for users, and{' '}
								<kbd
									className={clsx(
										'vtw-mx-1 vtw-flex vtw-h-5 vtw-w-5 vtw-items-center vtw-justify-center vtw-rounded vtw-border vtw-bg-white vtw-font-semibold vtw-sm:mx-2',
										rawQuery === '?'
											? 'vtw-border-indigo-600 vtw-text-indigo-600'
											: 'vtw-border-gray-400 vtw-text-gray-900'
									)}
								>
									?
								</kbd>{' '}
								for help.
							</div>
						</Combobox>
					</Transition.Child>
				</Dialog>
			</Transition.Root>
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

export default Hello
