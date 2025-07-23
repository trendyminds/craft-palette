import { atom, useAtom, useSetAtom, useAtomValue } from 'jotai'
import { atom as jotaiAtom } from 'jotai'
import { useMemo } from 'react'
import { queryState } from './useQuery'
import { rootUrl } from '../helpers'

const unfilteredActionsAtom = atom([])

export default function useActions() {
	const [unfilteredActions, setUnfilteredActions] = useAtom(
		unfilteredActionsAtom
	)
	const query = useAtomValue(queryState)
	const actions = useMemo(() => {
		return unfilteredActions.filter((action) => {
			return (
				action.name.toLowerCase().includes(query.toLowerCase()) ||
				action.subtitle.toLowerCase().includes(query.toLowerCase())
			)
		})
	}, [unfilteredActions, query])

	async function getActions() {
		const url = rootUrl()
		const response = await fetch(`${url}actions/palette/actions`)
		const data = await response.json()
		setUnfilteredActions(data)
	}

	return { getActions, actions }
}
