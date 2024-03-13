import clsx from 'clsx'
import { useEffect, useRef } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import useFocus from './hooks/useFocus'
import useContext from './hooks/useContext'
import Icon from './Icon'

export default function Result({ url, title, subtitle, icon, type, focused }) {
	const el = useRef(null)
	const [context, setContext] = useContext()
	const { focus, setFocus } = useFocus()

	// prettier-ignore
	useHotkeys('enter', () => {
		if (!focused) return
		if (type === 'link') {
			window.location = url
		} else {
			setContext(url)
		}
	}, { enableOnFormTags: true })

	// prettier-ignore
	useHotkeys('meta+enter', () => {
		if (!focused) return
		if (type === 'link') {
			window.open(url, '_blank')
		} else {
			setContext(url)
		}
	}, { enableOnFormTags: true })

	useEffect(() => {
		if (focused) {
			el.current.scrollIntoView({ block: 'center' })
		}
	}, [focus])

	return (
		<a
			className={clsx(
				'p-flex p-items-center p-gap-2',
				'p-font-sans p-text-sm p-text-zinc-700 dark:p-text-zinc-300 p-no-underline',
				'p-px-3 p-py-2.5 p-mx-2 p-rounded-lg',
				focused && 'p-bg-zinc-200/75 dark:p-bg-zinc-700/50',
				'hover:p-bg-zinc-200/75 dark:hover:p-bg-zinc-700/50'
			)}
			onMouseEnter={() => setFocus(null)}
			href={type === 'link' ? url : null}
			onClick={() => (type === 'context' ? setContext(url) : null)}
			ref={el}
		>
			<div className="p-flex p-items-center p-justify-between p-gap-2 p-flex-1">
				<div className="p-flex p-items-center p-gap-3 p-flex-1">
					<Icon name={icon} className="p-size-5 p-opacity-75" />
					<div className="p-flex-1 p-flex p-justify-between p-items-center p-gap-1">
						<p className="p-block p-leading-none p-m-0 p-font-sans p-font-medium">
							{title}
						</p>
						{subtitle && (
							<p className="p-block p-leading-none p-text-xs p-m-0 p-font-sans p-opacity-75">
								{subtitle}
							</p>
						)}
					</div>
				</div>
			</div>
		</a>
	)
}
