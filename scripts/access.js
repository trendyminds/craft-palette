;(() => {
	// Exit out if fetch isn't supported
	if (!('fetch' in window)) {
		return
	}

	// Run the request to see if the user is authenticated
	fetch(`/actions/palette/access`)
		.then((res) => {
			// If we received anything other than an OK, exit out
			if (res.status !== 200) {
				return
			}

			// Process the OK data as text
			return res.json()
		})
		.then((data) => {
			// If we don't have anything to render, exit out
			if (!data) {
				return
			}

			// Pluck the CSS and JS from the JSON response
			const { css, js } = data

			// Dynamically insert JS
			const script = document.createElement('script')
			script.src = js
			document.body.appendChild(script)

			// Dynamically insert CSS
			const link = document.createElement('link')
			link.rel = 'stylesheet'
			link.href = css
			document.body.appendChild(link)
		})
})()
