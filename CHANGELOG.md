# Release Notes for Palette

## 1.7.2 - 2022-10-14

### Fixed
- Improve contrast of search field text in dark mode ([Discussion](https://github.com/trendyminds/craft-palette/discussions/22))

## 1.7.1 - 2022-09-29

### Fixed
- Don't load Palette scripts when Craft is offline

## 1.7.0 - 2022-08-08

### Added
- Rebuilt command palette to support opening links in new tab via keyboard and mouse inputs

### Updated
- Updated all dependencies
- Removed kbar dependency

### Fixed
- Palette no longer steals focused inputs in control panel

## 1.6.0 - 2022-02-18

### Added
- Config options to [enable/disable loading Palette on the frontend](https://github.com/trendyminds/craft-palette/discussions/8) or backend

## 1.5.0 - 2022-02-11

### Updated
- PHP 7.3+ required
- Swapped tightenco/collect with illuminate/collections

## 1.4.0 - 2022-02-08

### Added
- New action: "Edit this entry". If we can map the URI of the front-end request to a Craft entry it will be added as the first action; allowing you to jump to that entry edit view from the front-end.

### Updated
- "Go to {systemName}" action now only renders when calling Palette on a control panel route

## 1.3.0 - 2022-02-08

### Added
- New action: Go to section entry types. If the type is "Default" it's swapped with the name of the section

## 1.2.0 - 2022-02-07

### Added
- New `badgeCount` property to display Craft's badge count values
- Add badge counts for primary navigation items

### Updated
- Move the Utility navigation badge count into the `badgeCount` property

### Fixed
- Exclude source files from being included in the Composer package

## 1.1.0 - 2022-02-07

### Added
- New action: "Go to {systemName}": Go to the URL defined by `siteUrl`
- Show the badge count when rendering utility items (for actions like "Updates")

## 1.0.0 - 2022-02-03

### Added
- Initial release!
