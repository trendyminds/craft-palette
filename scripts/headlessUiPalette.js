import React, { useState, useEffect, Fragment } from 'react'
import { Dialog, Combobox, Transition } from '@headlessui/react'
import * as HeroIcons from '@heroicons/react/outline'
import clsx from 'clsx'
import { SearchIcon } from '@heroicons/react/solid'
import { ExclamationIcon, SupportIcon } from '@heroicons/react/outline'

function Icon({ name, ...props }) {
	const { ...icons } = HeroIcons
	const HeroIcon = icons[name] ? icons[name] : icons['SearchIcon']
	return <HeroIcon {...props} />
}

export default function headlessUiPalette() {
	const [isOpen, setIsOpen] = useState(true)
	const [query, setQuery] = useState('')
	const [actions, setActions] = useState([])

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

	useEffect(() => {
		function onKeydown(event) {
			if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
				setIsOpen(!isOpen)
			}
		}
		window.addEventListener('keydown', onKeydown)
		return () => {
			window.removeEventListener('keydown', onKeydown)
		}
	}, [isOpen])

	const filteredProjects =
		query === ''
			? actions
			: query
			? actions.filter((project) =>
					project.name.toLowerCase().includes(query.toLowerCase())
			  )
			: []

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
				onClick={() => setIsOpen(!isOpen)}
			>
				<Icon name="TerminalIcon" className="vtw-h-5 vtw-w-5" />
			</button>

			<Transition.Root
				show={isOpen}
				as={Fragment}
				afterLeave={() => setQuery('')}
			>
				<Dialog
					onClose={setIsOpen}
					className="vtw-absolute vtw-inset-0 vtw-z-[9999] vtw-p-4 lg:vtw-p-[25vh] vtw-pt-20 vtw-overflow-y-auto"
				>
					<Transition.Child
						enter="vtw-ease-out vtw-duration-300"
						enterFrom="vtw-opacity-0"
						enterTo="vtw-opacity-100"
						leave="vtw-ease-in vtw-duration-200"
						leaveFrom="vtw-opacity-100"
						leaveTo="vtw-opacity-0"
					>
						<Dialog.Overlay className="vtw-fixed vtw-inset-0 vtw-bg-gray-500/75" />
					</Transition.Child>
					<Transition.Child
						enter="vtw-ease-out vtw-duration-300"
						enterFrom="vtw-opacity-0 vtw-scale-95"
						enterTo="vtw-opacity-100 vtw-scale-100"
						leave="vtw-ease-in vtw-duration-200"
						leaveFrom="vtw-opacity-100 vtw-scale-100"
						leaveTo="vtw-opacity-0 vtw-scale-95"
					>
						<Combobox
							onChange={(project) => {
								window.event.ctrlKey || window.event.metaKey
									? window.open(project.id, '_blank') && setIsOpen(false)
									: (window.location.url = project.id && setIsOpen(false))
							}}
							className="vtw-relative vtw-mx-auto vtw-mx-w-xl vtw-max-w-2xl vtw-bg-white vtw-shadow-2xl vtw-ring-1 vtw-ring-black/5 vtw-rounded-xl vtw-divide-y vtw-divide-gray-100 vtw-overflow-hidden"
							as="div"
						>
							<div className="vtw-flex vtw-items-center vtw-pl-6">
								<SearchIcon className="vtw-h-6 vtw-w-6 vtw-text-gray-500" />
								<Combobox.Input
									onChange={(event) => setQuery(event.target.value)}
									className="vtw-w-full vtw-ring-0 vtw-bg-transparent vtw-border-0 focus:vtw-ring-0 vtw-focus:outline-none vtw-text-sm vtw-text-gray-800 vtw-placeholder-gray-400 vtw-h-12"
									placeholder="Search..."
								/>
							</div>
							{filteredProjects.length > 0 && (
								<Combobox.Options
									static
									className="vtw-text-sm vtw-max-h-96 vtw-overflow-y-auto vtw-m-0 vtw-p-0"
								>
									{filteredProjects.map((project) => (
										<Combobox.Option
											key={project.id}
											value={project}
											className="vtw-list-none"
										>
											{({ active }) => (
												<div
													// onClick={(e) => handleClick(e, project.url)}
													className={`vtw-p-4 vtw-flex vtw-justify-between vtw-items-center vtw-mx-2 vtw-rounded-lg vtw-space-x-1 vtw-cursor-pointer ${
														active ? 'vtw-bg-gray-100' : 'vtw-bg-white'
													}`}
												>
													<div className="vtw-flex vtw-text-gray-600 vtw-items-center vtw-gap-2">
														<div className={clsx('vtw-h-6 vtw-w-6')}>
															<Icon name={project.icon} />
														</div>
														<span
															className={`vtw-capitalize ${
																active ? 'vtw-text-gray-700' : ''
															}`}
														>
															{project.name}
														</span>
														{project.subtitle && (
															<span
																className={`${
																	active ? 'vtw-text-gray-700' : ''
																}`}
															>
																{' '}
																/ {project.subtitle}
															</span>
														)}
													</div>
													<p
														className={`${
															active ? 'vtw-opacity-100' : 'vtw-opacity-0'
														} vtw-m-0 vtw-text-gray-700 vtw-transition-all`}
													>
														Jump to...
													</p>
												</div>
											)}
										</Combobox.Option>
									))}
								</Combobox.Options>
							)}
							{query === '?' && (
								<div className="vtw-pb-4 vtw-px-6 vtw-text-center vtw-text-sm vtw-sm:px-14">
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
							{query && query !== '?' && filteredProjects.length === 0 && (
								<div className="vtw-pb-4 vtw-px-6 vtw-text-center vtw-text-sm vtw-sm:px-14">
									<ExclamationIcon
										className="vtw-mx-auto vtw-h-6 vtw-w-6 vtw-text-gray-400"
										aria-hidden="true"
									/>
									<p className="vtw-mt-4 vtw-font-semibold vtw-text-gray-900">
										No results found
									</p>
									<p className="vtw-mt-2 vtw-text-gray-500">
										We couldn’t find anything with that term. Please try again.
									</p>
								</div>
							)}
						</Combobox>
					</Transition.Child>
				</Dialog>
			</Transition.Root>
		</>
	)
}
