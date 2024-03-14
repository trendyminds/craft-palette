import { useEffect } from 'react'
import clsx from 'clsx'
import useQuery from './hooks/useQuery'
import useContext from './hooks/useContext'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline'

export default function SearchBar({ placeholder = 'Search' }) {
	const [query, setQuery] = useQuery()
	const [context, setContext] = useContext()

	useEffect(() => {
		setQuery('')
	}, [context])

	return (
		<div className="p-flex p-px-2 p-items-center p-gap-1 p-border-b p-border-zinc-200 dark:p-border-zinc-700">
			{context !== 'ACTIONS' && (
				<div>
					<button
						className="p-size-8 p-flex p-items-center p-justify-center p-border p-border-zinc-300 dark:p-border-zinc-700 p-rounded-lg dark:p-bg-zinc-900"
						onClick={() => setContext('ACTIONS')}
					>
						<ArrowUturnLeftIcon className="p-size-4 p-text-zinc-500" />
					</button>
				</div>
			)}
			<input
				type="text"
				className={clsx([
					'p-bg-transparent',
					'p-w-full p-px-2 p-py-3',
					'p-outline-none p-ring-0 p-shadow-none p-border-0',
					'p-text-base placeholder:p-text-zinc-400 placeholder:dark:p-text-zinc-500 p-text-zinc-700 dark:p-text-zinc-200',
				])}
				placeholder={placeholder}
				onInput={({ target }) => setQuery(target.value)}
				value={query}
				autoFocus
				spellCheck={false}
			/>
		</div>
	)
}
