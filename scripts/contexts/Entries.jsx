import { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import useDebounce from '../hooks/useDebounce'
import useQuery from '../hooks/useQuery'
import useFocus from '../hooks/useFocus'
import NoResults from '../NoResults'
import Result from '../Result'
import { rootUrl } from '../helpers'

export default function Entries() {
	const [query] = useQuery()
	const [entries, setEntries] = useState([])
	const { focus, moveFocus } = useFocus(entries)

	// prettier-ignore
	useDebounce(() => {
		const url = rootUrl()
		fetch(`${url}actions/palette/search?query=${query}`)
			.then((response) => response.json())
			.then((data) => setEntries(data))
	}, [query], 200)

	// prettier-ignore
	useHotkeys('up', () => moveFocus('up', entries), {
		enableOnFormTags: true,
		preventDefault: true,
	})

	// prettier-ignore
	useHotkeys('down', () => moveFocus('down', entries), {
		enableOnFormTags: true,
		preventDefault: true,
	})

	return (
		<>
			{entries.length === 0 && <NoResults text="No matching entries found" />}
			{entries.map((entry, i) => (
				<Result
					key={entry.url}
					url={entry.url}
					title={entry.name}
					subtitle={entry.subtitle}
					icon={entry.icon}
					focused={i === focus}
					type={entry.type}
				/>
			))}
		</>
	)
}
