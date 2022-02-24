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
				<div className="cp-fixed cp-inset-0 cp-z-[999] cp-w-screen cp-h-screen cp-flex cp-flex-col cp-items-center cp-pt-24">
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

