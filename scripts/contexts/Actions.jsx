import { useEffect } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import useActions from '../hooks/useActions'
import useFocus from '../hooks/useFocus'
import Result from '../Result'
import NoResults from '../NoResults'

export default function Actions() {
	const { actions, getActions } = useActions()
	const { focus, moveFocus } = useFocus(actions)

	// prettier-ignore
	useHotkeys('up', () => moveFocus('up', actions), {
		enableOnFormTags: true,
		preventDefault: true,
	})

	// prettier-ignore
	useHotkeys('down', () => moveFocus('down', actions), {
		enableOnFormTags: true,
		preventDefault: true,
	})

	useEffect(() => {
		getActions()
	}, [])

	return (
		<>
			{actions.length === 0 && <NoResults />}
			{actions.map((action, i) => (
				<Result
					key={action.url}
					url={action.url}
					title={action.name}
					subtitle={action.subtitle}
					icon={action.icon}
					focused={i === focus}
					type={action.type}
				/>
			))}
		</>
	)
}
