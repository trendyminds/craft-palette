import React from 'react'
import { PaletteContextWrapper, usePaletteContext } from './Context'
import Overlay from './Overlay'
import Modal from './Modal'
import Trigger from './Trigger'
import FocusTrap from 'focus-trap-react'
import { motion, AnimatePresence } from 'framer-motion'

function Layout() {
	const { open } = usePaletteContext()
	return (
		<AnimatePresence>
			{open && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="cp-fixed cp-inset-0 cp-z-[999] cp-w-screen cp-h-screen"
				>
					<FocusTrap active={true}>
						<div className="cp-absolute cp-inset-0 cp-w-screen cp-h-screen cp-flex cp-flex-col cp-items-center cp-pt-24">
							<Overlay />
							<Modal />
						</div>
					</FocusTrap>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default function App() {
	return (
		<PaletteContextWrapper>
			<Trigger />
			<Layout />
		</PaletteContextWrapper>
	)
}
