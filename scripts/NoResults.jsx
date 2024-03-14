export default function NoResults({ text = 'No matching results found' }) {
	return (
		<div className="p-flex p-flex-col p-justify-center p-items-center p-py-6 p-text-zinc-400 dark:p-text-zinc-500">
			<div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="p-size-12"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
					/>
				</svg>
			</div>
			<p className="p-text-lg p-mt-1">{text}</p>
		</div>
	)
}
