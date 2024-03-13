import {
	AdjustmentsVerticalIcon,
	ArrowLeftEndOnRectangleIcon,
	Bars3Icon,
	CircleStackIcon,
	DocumentIcon,
	GlobeAltIcon,
	MagnifyingGlassIcon,
	PaperClipIcon,
	PencilSquareIcon,
	UserCircleIcon,
} from '@heroicons/react/24/outline'

export default function Icon({ name, ...props }) {
	if (name === 'document') {
		return <DocumentIcon {...props} />
	}

	if (name === 'search') {
		return <MagnifyingGlassIcon {...props} />
	}

	if (name === 'globe') {
		return <GlobeAltIcon {...props} />
	}

	if (name === 'edit') {
		return <PencilSquareIcon {...props} />
	}

	if (name === 'menu') {
		return <Bars3Icon {...props} />
	}

	if (name === 'attachment') {
		return <PaperClipIcon {...props} />
	}

	if (name === 'database') {
		return <CircleStackIcon {...props} />
	}

	if (name === 'utility') {
		return <AdjustmentsVerticalIcon {...props} />
	}

	if (name === 'user') {
		return <UserCircleIcon {...props} />
	}

	if (name === 'logout') {
		return <ArrowLeftEndOnRectangleIcon {...props} />
	}

	return <DocumentIcon {...props} />
}
