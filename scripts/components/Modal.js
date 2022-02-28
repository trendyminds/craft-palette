import React from 'react'
import clsx from 'clsx'
import { ExclamationIcon, SupportIcon } from '@heroicons/react/outline'
import { usePaletteContext } from './Context'
import Search from './Search'
import Result from './Result'

export default function Modal() {
	const { rawQuery, actions } = usePaletteContext()

	const query = rawQuery.toLowerCase().replace(/^[#>]/, '')
	const filteredActions = actions.filter(
		(action) =>
			action.name.toLowerCase().includes(query) ||
			action.subtitle.toLowerCase().includes(query)
	)

	return (
		<nav
			className={clsx(
				'cp-relative cp-text-sm cp-overflow-hidden',
				'cp-max-w-xl cp-w-full cp-transform cp-rounded-xl cp-bg-white cp-shadow-2xl cp-ring-1',
				'cp-ring-black cp-ring-opacity-5 cp-transition-all',
				'dark:cp-bg-gray-900'
			)}
		>
			<Search />
			<div className={`cp-px-3 cp-overflow-y-auto cp-scrollbar ${filteredActions?.length > 6 && 'cp-h-96'}`}>
				{filteredActions?.map((item, i) => {
					return (
						<Result key={i} result={item} firstResult={i === 0} />
					)
				})}
		</div>

			{rawQuery === '?' && (
				<div className="cp-py-4 cp-px-6 cp-text-center cp-text-sm cp-sm:px-14">
					<SupportIcon
						className="cp-mx-auto cp-h-6 cp-w-6 cp-text-gray-400"
						aria-hidden="true"
					/>
					<p
						className={clsx(
							'cp-mt-4 cp-font-semibold cp-text-gray-900',
							'dark:cp-text-white'
						)}
					>
						Help with searching
					</p>
					<p className="cp-mt-2 cp-text-gray-500">
						Use this tool to quickly search for users and projects across our
						entire platform. You can also use the search modifiers found in the
						footer below to limit the results to just users or projects.
					</p>
				</div>
			)}

			{rawQuery !== '' && rawQuery !== '?' && filteredActions.length === 0 && (
				<div className="cp-py-4 cp-px-6 cp-text-center cp-text-sm cp-sm:px-14">
					<ExclamationIcon
						className="cp-mx-auto cp-h-6 cp-w-6 cp-text-gray-400"
						aria-hidden="true"
					/>
					<p
						className={clsx(
							'cp-mt-4 cp-font-semibold cp-text-gray-900',
							'dark:cp-text-white'
						)}
					>
						No results found
					</p>
					<p className="cp-mt-2 cp-text-gray-500">
						We couldn’t find anything with that term. Please try again.
					</p>
				</div>
			)}
		</nav>
	)
}
