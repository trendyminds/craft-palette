import React from 'react'
import { PaletteContextWrapper, usePaletteContext } from './Context'
import Overlay from './Overlay'
import Modal from './Modal'
import Trigger from './Trigger'
import FocusTrap from 'focus-trap-react'

function Layout() {
	const { open } = usePaletteContext()
	if (open) {
		return (
			<FocusTrap active={true}>
				<div className="vtw-fixed vtw-inset-0 vtw-z-[999] vtw-w-screen vtw-h-screen vtw-flex vtw-flex-col vtw-justify-center vtw-items-center">
					<Overlay />
					<Modal />
				</div>
			</FocusTrap>
		)
	}

	return null
}

export default function App() {
	return (
		<PaletteContextWrapper>
			<Trigger />
			<Layout />
		</PaletteContextWrapper>
	)
}

