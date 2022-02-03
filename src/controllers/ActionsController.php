<?php

namespace trendyminds\palette\controllers;

use Craft;
use craft\elements\Entry;
use craft\elements\User;
use craft\helpers\UrlHelper;
use craft\web\Controller;

class ActionsController extends Controller
{
	protected $allowAnonymous = false;

	public function actionIndex()
	{
		return $this->asJson([
			...$this->_defaultActions(),
			...$this->_userPermissableActions(),
			...$this->_adminActions(),
		]);
	}

	/**
	 * Return a static list of default actions available to all users regardless of permissions
	 *
	 * @return array
	 */
	private function _defaultActions(): array
	{
		return [
			[
				'name' => 'Dashboard',
				'section' => 'Navigation',
				'icon' => 'ChartBarIcon',
				'url' => UrlHelper::cpUrl('dashboard'),
			],
			[
				'name' => 'Entries',
				'section' => 'Navigation',
				'icon' => 'CollectionIcon',
				'url' => UrlHelper::cpUrl('entries'),
			],
			[
				'name' => 'Edit your profile',
				'section' => 'User',
				'icon' => 'UserCircleIcon',
				'url' => UrlHelper::cpUrl('myaccount'),
			],
			[
				'name' => 'Logout',
				'section' => 'User',
				'icon' => 'LogoutIcon',
				'url' => UrlHelper::siteUrl(
					Craft::$app->getConfig()->getGeneral()->getLogoutPath()
				)
			],
		];
	}

	/**
	 * Add admin-level actions. Will return an empty array if the logged in user is not an admin
	 *
	 * @return array
	 */
	private function _adminActions(): array
	{
		/** @var User */
		$currentUser = Craft::$app->getUsers()->getUserById(
			Craft::$app->getUser()->identity->id
		);

		// Return nothing if the user isn't an admin
		if (!$currentUser->admin) {
			return [];
		}

		$fields = collect(Craft::$app->getFields()->getAllFields())
			->map(fn($i) => [
				'name' => $i->name,
				'section' => 'Fields',
				'subtitle' => $i->displayName(),
				'icon' => 'CodeIcon',
				'url' => UrlHelper::cpUrl("settings/fields/edit/{$i->id}"),
			])->toArray();

		$sections = collect(Craft::$app->getSections()->getAllSections())
			->map(fn($i) => [
				'name' => $i->name,
				'section' => 'Sections',
				'subtitle' => ucfirst($i->type),
				'icon' => 'CollectionIcon',
				'url' => UrlHelper::cpUrl("settings/sections/{$i->id}"),
			])->toArray();

		return [
			...$fields,
			...$sections,
			[
				'name' => 'All Settings',
				'section' => 'Settings',
				'icon' => 'CogIcon',
				'url' => UrlHelper::cpUrl('settings'),
			],
			[
				'name' => 'Sections',
				'section' => 'Settings',
				'icon' => 'CogIcon',
				'url' => UrlHelper::cpUrl('settings/sections'),
			],
			[
				'name' => 'Fields',
				'section' => 'Settings',
				'icon' => 'CogIcon',
				'url' => UrlHelper::cpUrl('settings/fields'),
			],
			[
				'name' => 'Assets',
				'section' => 'Settings',
				'icon' => 'CogIcon',
				'url' => UrlHelper::cpUrl('settings/assets'),
			],
			[
				'name' => 'Assets',
				'section' => 'Navigation',
				'icon' => 'PhotographIcon',
				'url' => UrlHelper::cpUrl('assets'),
			],
			[
				'name' => 'Globals',
				'section' => 'Settings',
				'icon' => 'CogIcon',
				'url' => UrlHelper::cpUrl('settings/globals'),
			],
			[
				'name' => 'Project Config',
				'section' => 'Utilities',
				'icon' => 'AdjustmentsIcon',
				'url' => UrlHelper::cpUrl('utilities/project-config'),
			],
		];
	}

	private function _userPermissableActions(): array
	{
		/** @var User */
		$currentUser = Craft::$app->getUsers()->getUserById(
			Craft::$app->getUser()->identity->id
		);

		// Get a list of all available actions. We shouldn't include ones that don't exist in this instance of Craft
		// For example: If SEOmatic isn't installed we need to exclude that as an option
		$availablePermissions = collect()
			->merge(
				$this->_flattenKeys(Craft::$app->userPermissions->getAllPermissions())
			)
			->unique()
			->values()
			->toArray();

		return collect($this->_fullPermissionActions())
				->filter(fn($data, $actionName) => in_array($actionName, $availablePermissions))
				->filter(function($action, $performAction) use ($currentUser) {
					return $currentUser->can($performAction);
				})
				->values()
				->toArray();
	}

	/**
	 * The list of all permission-based actions we can show. Use _userPermissableActions() to determine the current user's available actions
	 *
	 * @return array
	 */
	private function _fullPermissionActions(): array
	{
		return [
			'editUsers' => [
				'name' => 'Users',
				'icon' => 'UsersIcon',
				'section' => 'Navigation',
				'url' => UrlHelper::cpUrl('users'),
			],
			'utility:db-backup' => [
				'name' => 'Database Backup',
				'icon' => 'DatabaseIcon',
				'url' => UrlHelper::cpUrl('utilities/db-backup'),
				'section' => 'Utilities',
			],
			'utility:updates' => [
				'name' => 'Updates',
				'icon' => 'RefreshIcon',
				'url' => UrlHelper::cpUrl('utilities/updates'),
				'section' => 'Utilities',
			],
			'utility:system-report' => [
				'name' => 'System Report',
				'icon' => 'DocumentReportIcon',
				'url' => UrlHelper::cpUrl('utilities/system-report'),
				'section' => 'Utilities',
			],
			'utility:queue-manager' => [
				'name' => 'Queue Manager',
				'icon' => 'ClockIcon',
				'url' => UrlHelper::cpUrl('utilities/queue-manager'),
				'section' => 'Utilities',
			],
			'utility:deprecation-errors' => [
				'name' => 'Deprecation Errors',
				'icon' => 'ExclamationIcon',
				'url' => UrlHelper::cpUrl('utilities/deprecation-errors'),
				'section' => 'Utilities',
			],
			'utility:clear-caches' => [
				'name' => 'Clear Caches',
				'icon' => 'TrashIcon',
				'url' => UrlHelper::cpUrl('utilities/clear-caches'),
				'section' => 'Utilities',
			],
			'utility:migrations' => [
				'name' => 'Migrations',
				'icon' => 'SwitchVerticalIcon',
				'url' => UrlHelper::cpUrl('utilities/migrations'),
				'section' => 'Utilities',
			],
			'accessPlugin-navigation' => [
				'name' => 'Navigation',
				'icon' => 'MenuIcon',
				'section' => 'Navigation',
				'url' => UrlHelper::cpUrl('navigation'),
			],
			'accessPlugin-retour' => [
				'name' => 'Retour',
				'icon' => 'GlobeAltIcon',
				'section' => 'Navigation',
				'url' => UrlHelper::cpUrl('retour'),
			],
			'accessPlugin-seomatic' => [
				'name' => 'SEOmatic',
				'icon' => 'ChartSquareBarIcon',
				'section' => 'Navigation',
				'url' => UrlHelper::cpUrl('seomatic'),
			],
			'accessPlugin-feed-me' => [
				'name' => 'Feed Me',
				'icon' => 'CloudDownloadIcon',
				'section' => 'Navigation',
				'url' => UrlHelper::cpUrl('feed-me'),
			],
			'canViewGuide' => [
				'name' => 'Guide',
				'icon' => 'SupportIcon',
				'section' => 'Navigation',
				'url' => UrlHelper::cpUrl('guide'),
				'section' => 'Navigation'
			],
		];
	}

	/**
	 * Takes a multidimensional array and creates a flattened list of keys used within the array
	 *
	 * @param array $array
	 *
	 * @return array The flattened result
	 */
	private function _flattenKeys(array $array): array
	{
		$keys = [];

		foreach ($array as $key => $value) {
			$keys[] = $key;

			if (is_array($value)) {
				$keys = array_merge($keys, $this->_flattenKeys($value));
			}
		}

		return $keys;
	}
}
