import { useEffect } from 'react'

export default function useDebounce(effect, deps, delay) {
	useEffect(() => {
		const handler = setTimeout(() => effect(), delay)
		return () => clearTimeout(handler)
	}, [...(deps || []), delay])
}
