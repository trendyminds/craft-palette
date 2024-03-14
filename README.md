# <img src="src/icon.svg" height="20" width="20"> Palette
⌨️ CMD+K your way around Craft!

## 🤔 What is Palette?

Palette allows you to easily jump between areas, entries, assets, and users within Craft without lifting your hands off the keyboard!

If you're a developer, you likely use something like [Raycast](https://www.raycast.com/), [Alfred](https://www.alfredapp.com/), or [Spotlight](https://support.apple.com/guide/mac-help/search-with-spotlight-mchlp1008/mac).

That should also exist in the CMS you use most, right?

## ⚡️ Features
- 🔍 Available on the front-end and in the control panel
- 🌗 Light and dark mode support
- ⭐️ Zero setup necessary; just install and enable
- 🏎 Compatible with full-page static caching strategies like [Blitz](https://putyourlightson.com/plugins/blitz)
- 🔐 Actions change based on user permissions and if admin changes are allowed
- 🎛️ Change contexts to filter actions or search your content
- 🔌 Plugins that register navigation links, settings areas, and utilities are included automatically
- 💅 Add your own custom URLs via the config file (Craft 4+ only)

<img src="docs/light-and-dark.png" alt="The light and dark themes of Palette shown side by side with the default list of results">

## 📦 Installing

Install Palette one of two ways:

- [Install via Craft's Plugin Store](https://plugins.craftcms.com/palette)
- Run `composer require trendyminds/craft-palette` and enable the plugin from "Settings > Plugins"
- Optionally, you can configure Palette by adding a `config/palette.php` file and [modifying the default options](src/config.php)

## 🤝 Contributing

If you would like to contribute to Palette we tried to make it as easy as possible:

1. Clone the repo
2. Run `npm i` to install the Node dependencies
3. Run `npm start` to begin the watch task
4. Make your changes
5. Run `npm run build` to compile and minify the CSS and JS
6. Submit a PR!

## ❤️ Shout-outs

Palette could not exist without the efforts and incredible work of:

- The Pixel & Tonic team and their hard work on Craft
- The wonderful Craft CMS community
- Tools like [Tailwind CSS](https://tailwindcss.com/)
