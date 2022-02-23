import React from 'react'
import { render } from 'react-dom'
import Palette from './palette'
import HeadlessUiPalette from './headlessUiPalette'

// Create an element to insert the React component into
const $el = document.createElement('div')
$el.setAttribute('data-palette', '')
document.body.appendChild($el)

// Select the element and insert Palette into it
document
	.querySelectorAll('[data-palette]')
	.forEach(($el) => render(<HeadlessUiPalette />, $el))
