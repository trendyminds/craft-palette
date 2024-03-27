import clsx from 'clsx'
import { useHotkeys } from 'react-hotkeys-hook'
import useOpen from './hooks/useOpen'
import useContext from './hooks/useContext'
import useOutsideClick from './hooks/useClickOutside'
import Actions from './contexts/Actions'
import Entries from './contexts/Entries'
import SearchBar from './SearchBar'
import { CommandLineIcon } from '@heroicons/react/24/outline'

export default function Modal() {
	const [open, setOpen] = useOpen()
	const [context, setContext] = useContext()
	const modal = useOutsideClick(() => setOpen(false))

	// prettier-ignore
	useHotkeys(['ctrl+k, meta+k'], () => {
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
							ref={modal}
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

			<button
				className={clsx([
					'p-fixed p-bottom-5 p-right-5 p-z-[100]',
					'p-flex p-items-center p-justify-center',
					'p-backdrop-blur-md p-shadow p-rounded-full',
					'p-bg-zinc-50/70 dark:p-bg-neutral-800/90',
					'dark:p-text-neutral-300',
					'p-size-8',
					'p-cursor-pointer',
					'p-border-0',
					'p-transition-transform hover:p-scale-110 active:p-scale-90',
				])}
				onClick={() => setOpen(true)}
				aria-label="Open Palette"
			>
				<CommandLineIcon className="p-size-5" />
			</button>
		</>
	)
}
