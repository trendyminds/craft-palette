import {
	AdjustmentsVerticalIcon,
	ArrowLeftEndOnRectangleIcon,
	Bars3Icon,
	BoltIcon,
	CircleStackIcon,
	CodeBracketSquareIcon,
	Cog8ToothIcon,
	DocumentIcon,
	GlobeAltIcon,
	MagnifyingGlassIcon,
	PaperClipIcon,
	PencilSquareIcon,
	Squares2X2Icon,
	TableCellsIcon,
	UserCircleIcon,
} from '@heroicons/react/24/outline'

export default function Icon({ name, ...props }) {
	if (name === 'document') {
		return <DocumentIcon {...props} />
	}

	if (name === 'table') {
		return <TableCellsIcon {...props} />
	}

	if (name === 'section') {
		return <Squares2X2Icon {...props} />
	}

	if (name === 'code') {
		return <CodeBracketSquareIcon {...props} />
	}

	if (name === 'bolt') {
		return <BoltIcon {...props} />
	}

	if (name === 'settings') {
		return <Cog8ToothIcon {...props} />
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
