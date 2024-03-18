import { atom, selector, useRecoilState, useRecoilValue } from 'recoil'
import { queryState } from './useQuery'
import { rootUrl } from '../helpers'

const unfilteredActionsState = atom({
	key: 'unfilteredActionsState',
	default: [],
})

const actionsState = selector({
	key: 'actionsState',
	get: ({ get }) => {
		const query = get(queryState)
		const unfilteredActions = get(unfilteredActionsState)
		return unfilteredActions.filter((action) => {
			return (
				action.name.toLowerCase().includes(query.toLowerCase()) ||
				action.subtitle.toLowerCase().includes(query.toLowerCase())
			)
		})
	},
})

export default function useActions() {
	const [unfilteredActions, setUnfilteredActions] = useRecoilState(
		unfilteredActionsState
	)
	const actions = useRecoilValue(actionsState)

	async function getActions() {
		const url = rootUrl()
		const response = await fetch(`${url}actions/palette/actions`)
		const data = await response.json()
		setUnfilteredActions(data)
	}

	return {
		getActions,
		actions,
	}
}
