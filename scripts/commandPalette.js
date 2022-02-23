import { useState, useEffect, Fragment } from 'react'
import { Dialog, Combobox, Transition } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/solid'

export default function CommandPalette({ projects }) {
	const [isOpen, setIsOpen] = useState(false)
	const [query, setQuery] = useState('')

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
			? projects
			: query
			? projects.filter((project) =>
					project.name.toLowerCase().includes(query.toLowerCase())
			  )
			: []

	return (
		<Transition.Root
			show={isOpen}
			as={Fragment}
			afterLeave={() => setQuery('')}
		>
			<Dialog
				onClose={setIsOpen}
				className="fixed inset-0 p-[25vh] pt-20 overflow-y-auto"
			>
				<Transition.Child
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<Dialog.Overlay className="fixed inset-0 bg-gray-500/75" />
				</Transition.Child>
				<Transition.Child
					enter="ease-out duration-300"
					enterFrom="opacity-0 scale-95"
					enterTo="opacity-100 scale-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-95"
				>
					<Combobox
						onChange={(project) => {
							window.event.ctrlKey || window.event.metaKey
								? window.open(project.url, '_blank') && setIsOpen(false)
								: (window.location = project.url && setIsOpen(false))
						}}
						as="div"
						className="relative mx-auto mx-w-xl bg-white shadow-2xl ring-1 ring-black/5 rounded-xl divide-y divide-gray-100 overflow-hidden"
					>
						<div className="flex items-center px-4">
							<SearchIcon className="h-6 w-6 text-gray-500" />
							<Combobox.Input
								onChange={(event) => setQuery(event.target.value)}
								className="w-full bg-transparent border-0 focus:ring-0 text-sm text-gray-800 placeholder-gray-400 h-12"
								placeholder="Search..."
							/>
						</div>
						{filteredProjects.length > 0 && (
							<Combobox.Options
								static
								className="py-4 text-sm max-h-96 overflow-y-auto"
							>
								{filteredProjects.map((project) => (
									<Combobox.Option key={project.id} value={project}>
										{({ active }) => (
											<div
												// onClick={(e) => handleClick(e, project.url)}
												className={`px-4 py-2 space-x-1 cursor-pointer ${
													active ? 'bg-indigo-600' : 'bg-white'
												}`}
											>
												<span
													className={`font-medium text-gray-900 ${
														active ? 'text-white' : 'text-gray-900'
													}`}
												>
													{project.name}
												</span>
												<span
													className={`text-gray-400 ${
														active ? 'text-gray-400' : 'text-indigo-500'
													}`}
												>
													in {project.team}
												</span>
											</div>
										)}
									</Combobox.Option>
								))}
							</Combobox.Options>
						)}
						{query && filteredProjects.length === 0 && (
							<p className="p-4">No results found</p>
						)}
					</Combobox>
				</Transition.Child>
			</Dialog>
		</Transition.Root>
	)
}
