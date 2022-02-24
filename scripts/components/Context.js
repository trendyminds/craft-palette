import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	useRef,
} from 'react'

export const PaletteContext = createContext()

export function usePaletteContext() {
	return useContext(PaletteContext)
}

export function PaletteContextWrapper({ children }) {
	const [open, setOpen] = useState(true)
	const [rawQuery, setRawQuery] = useState('')
	const [actions, setActions] = useState([])
	const searchNode = useRef(null)
	const firstResultNode = useRef(null)

	const context = {
		open,
		setOpen,
		rawQuery,
		setRawQuery,
		actions,
		setActions,
		searchNode,
		firstResultNode,
	}

	// Trigger Stuff on Global Key Presses
	useEffect(() => {
		function onKeydown(event) {
			if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
				setOpen(!open)
			}
			if (event.key === 'Escape') {
				setOpen(false)
			}
		}
		window.addEventListener('keydown', onKeydown)
		return () => {
			window.removeEventListener('keydown', onKeydown)
		}
	}, [open])

	// Prevent Page Scrolling When Open
	useEffect(() => {
		open
			? (document.body.style.overflow = 'hidden')
			: (document.body.style.overflow = 'unset')
	}, [open])

	// Fetching All Actions from Craft
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

	return (
		<PaletteContext.Provider value={context}>
			{children}
		</PaletteContext.Provider>
	)
}
