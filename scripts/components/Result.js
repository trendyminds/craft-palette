import React from 'react'
import clsx from 'clsx'
import Icon from './Icon'
import { usePaletteContext } from './Context'


export default function Result(props) {
	const { result } = props
	const { setOpen } = usePaletteContext()


	const handleRoute = (event, item) => {
		setOpen(false)
		return event.ctrlKey || event.metaKey
			? window.open(result.id, '_blank')
			: (window.location = result.id)
	}

	function handleMouseOver(event) {
		const el = event.currentTarget
		return el.focus()
	}

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

	return (
		<button
			onMouseOver={handleMouseOver}
			onKeyDown={handleKeyDown}
			onClick={(e) => handleRoute(e, result)}
			value={result}
			className={clsx(
				'cp-flex cp-items-center cp-gap-3 cp-group',
				'cp-text-sm cp-font-light cp-text-slate-600 cp-tracking-wide cp-border-none focus:cp-bg-white',
				'cp-p-3 cp-py-3 cp-my-1 cp-w-full cp-text-left',
				'cp-select-none cp-rounded-lg',
				' focus:cp-outline-none focus:cp-ring-0 focus:cp-outline-0 ',
				'dark:cp-text-neutral-400 dark:focus:cp-bg-gray-800 dark:focus:cp-text-white',
				'cp-transition-all focus:cp-bg-gray-100'
			)}
		>
			<div className={clsx('cp-h-5 cp-w-5 cp-text-slate-400')}>
				<Icon name={result.icon} />
			</div>
			<div className="cp-flex cp-justify-between cp-gap-3 cp-flex-1">
				<div className="cp-flex cp-flex-col cp-gap-1 cp-flex-1 cp-justify-center">
					<p className={clsx('cp-leading-none cp-capitalize cp-m-0')}>
						{result.name}
					</p>
				</div>
				<div>
					{result.subtitle && (
						<p className="group-focus:cp-opacity-100 cp-opacity-0 cp-transition-opacity cp-text-sm">
							{' '}
							{result.subtitle}
						</p>
					)}
				</div>
				{result?.badgeCount && (
					<div
						className={clsx(
							'cp-bg-neutral-600 dark:cp-bg-neutral-400',
							'cp-h-5 cp-w-5 cp-rounded-full',
							'cp-flex cp-items-center cp-justify-center cp-self-center'
						)}
					>
						<p
							className={clsx(
								'cp-text-[10px] cp-leading-none cp-font-bold',
								'cp-text-white dark:cp-text-neutral-800',
								'cp-m-0'
							)}
						>
							{result?.badgeCount}
						</p>
					</div>
				)}
			</div>
		</button>
	)
}
