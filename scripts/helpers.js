/**
 * Supplies the correct URL of where requests should originate
 * based on the value of `baseUrl` in `config/palette.php`
 * @returns {string}
 */
export function rootUrl() {
	// If a custom baseUrl was set we need to use that. Otherwise use the webroot
	let url = '/'

	if (window.palette && window.palette.baseUrl) {
		url = `${window.palette.baseUrl}/`

		// If URL has multiple slashes, remove them all and add a single slash
		url = url.replace(/\/+$/, '/')
	}

	return url
}
