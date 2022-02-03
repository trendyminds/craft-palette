<?php

namespace trendyminds\palette\controllers;

use Craft;
use craft\elements\User;
use craft\web\Controller;
use craft\helpers\UrlHelper;
use craft\web\twig\variables\Cp;

class ActionsController extends Controller
{
	protected $allowAnonymous = false;

	public function actionIndex()
	{
		return $this->asJson([
			...$this->_userActions(),
			...$this->_navigationActions(),
			...$this->_adminActions(),
			...$this->_utilityActions(),
		]);
	}

	/**
	 * Return a static list of user actions available to all users regardless of permissions
	 *
	 * @return array
	 */
	private function _userActions(): array
	{
		return [
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
	 * Return a list of the navigation items available to the signed in user
	 *
	 * @return array
	 */
	private function _navigationActions(): array
	{
		return collect((new Cp())->nav())
			->map(function($i) {
				$url = str_replace(
					Craft::$app->getRequest()->hostInfo . "/",
					"",
					$i['url']
				);

				return [
					'name' => $i['label'],
					'section' => 'Navigation',
					'icon' => 'MenuIcon',
					'url' => UrlHelper::cpUrl($url),
				];
			})
			->toArray();
	}

	/**
	 * Return a list of the utility sections available to the signed in user
	 *
	 * @return array
	 */
	private function _utilityActions(): array
	{
		return collect(Craft::$app->getUtilities()->getAuthorizedUtilityTypes())
			->map(fn($class) => [
				'name' => $class::displayName(),
				'section' => 'Utilities',
				'icon' => 'AdjustmentsIcon',
				'url' => UrlHelper::cpUrl("utilities/{$class::id()}"),
			])
			->toArray();
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

		// Return nothing if the site doesn't allow admin changes
		if (!Craft::$app->getConfig()->getGeneral()->allowAdminChanges) {
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

		$settings = collect((new Cp())->settings())
			->map(function($i, $section) {
					return collect($i)->map(function ($item, $slug) use ($section) {
						return [
							'name' => $item['label'],
							'url' => $section === 'Plugins'
								? UrlHelper::cpUrl($item['url'])
								: UrlHelper::cpUrl("settings/{$slug}"),
							'icon' => $section === 'Plugins'
								? 'LightningBoltIcon'
								: 'CogIcon',
							'subtitle' => $section,
							'section' => "Settings",
						];
					})->toArray();
			})
			->flatten(1)
			->toArray();

		return [
			...$fields,
			...$sections,
			...$settings,
		];
	}
}
