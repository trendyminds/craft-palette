import { atom, useRecoilState } from 'recoil'
import { useEffect } from 'react'

export const focusState = atom({
	key: 'focus',
	default: 0,
})

export default function useFocus(results) {
	const [focus, setFocus] = useRecoilState(focusState)

	// Reset focus when results change
	useEffect(() => {
		setFocus(0)
	}, [results])

	async function moveFocus(direction, results) {
		if (results.length === 0) {
			return
		}

		if (direction === 'up' && focus === 0) {
			return
		}

		if (direction === 'down' && focus === results.length - 1) {
			return
		}

		if (direction === 'up') {
			setFocus((prev) => prev - 1)
		}

		if (direction === 'down') {
			setFocus((prev) => prev + 1)
		}
	}

	return {
		setFocus,
		moveFocus,
		focus,
	}
}
