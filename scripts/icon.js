import React from 'react'
import * as HeroIcons from '@heroicons/react/outline'

export default function Icon({ name, ...props }) {
	const { ...icons } = HeroIcons
	const HeroIcon = icons[name] ? icons[name] : icons['SearchIcon']

	return <HeroIcon {...props} />
}
