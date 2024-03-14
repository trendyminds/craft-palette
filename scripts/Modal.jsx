import clsx from 'clsx'
import { useHotkeys } from 'react-hotkeys-hook'
import useOpen from './hooks/useOpen'
import useContext from './hooks/useContext'
import Actions from './contexts/Actions'
import Entries from './contexts/Entries'
import SearchBar from './SearchBar'

export default function Modal() {
	const [open, setOpen] = useOpen()
	const [context, setContext] = useContext()

	// prettier-ignore
	useHotkeys('meta+k', () => {
		setOpen((prev) => !prev)
		setContext('ACTIONS')
	}, { enableOnFormTags: true, preventDefault: true })

	// prettier-ignore
	useHotkeys('esc', () => {
		if (context === 'ACTIONS') { setOpen(false) }
		setContext('ACTIONS')
	}, { enableOnFormTags: true })

	return (
		<>
			{open && (
				<div className="p-fixed p-inset-0 p-z-[9999] p-size-full p-flex p-justify-center p-antialiased">
					<div className="p-w-full p-max-w-2xl">
						<div
							className={clsx([
								'p-bg-white/70 dark:p-bg-zinc-950/90',
								'p-outline-zinc-300 dark:p-outline-zinc-900 p-outline p-outline-1',
								'p-border p-border-white dark:p-border-zinc-500',
								'p-rounded-lg p-translate-y-24 p-overflow-hidden p-backdrop-blur-xl p-shadow-2xl',
							])}
						>
							<SearchBar />
							<div className="dark:p-bg-zinc-950/10 p-max-h-96 p-overflow-scroll p-py-2">
								{context === 'ACTIONS' && <Actions />}
								{context === 'SEARCH_ENTRIES' && <Entries />}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
