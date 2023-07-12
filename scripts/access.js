;(() => {
	// Exit out if fetch isn't supported
	if (!('fetch' in window)) {
		return
	}

	// If a custom baseUrl was set we need to use that. Otherwise use the webroot
	let url = '/'

	if (window.palette && window.palette.baseUrl) {
		url = `${window.palette.baseUrl}/`

		// If URL has multiple slashes, remove them all and add a single slash
		url = url.replace(/\/+$/, '/')
	}

	// Run the request to see if the user is authenticated
	fetch(`${url}actions/palette/access`)
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
			script.defer = true
			document.body.appendChild(script)

			// Dynamically insert CSS
			const link = document.createElement('link')
			link.rel = 'stylesheet'
			link.href = css
			document.body.appendChild(link)
		})
})()
