import React from 'react'
import { createRoot } from 'react-dom/client'
import Root from './Root'

// Create an element to insert the React component into
const $el = document.createElement('div')
$el.setAttribute('data-palette', '')
document.body.appendChild($el)

// Select the element and insert Palette into it
document
	.querySelectorAll('[data-palette]')
	.forEach(($el) => createRoot($el).render(<Root />))
