import { Provider as JotaiProvider } from 'jotai'
import Modal from './Modal'

export default function Palette() {
	return (
		<JotaiProvider>
			<Modal />
		</JotaiProvider>
	)
}
