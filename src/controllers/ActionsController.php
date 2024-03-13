<?php

namespace trendyminds\palette\controllers;

use Craft;
use craft\elements\User;
use craft\helpers\UrlHelper;
use craft\web\Controller;
use craft\web\twig\variables\Cp;
use trendyminds\palette\Palette;

class ActionsController extends Controller
{
    protected array|int|bool $allowAnonymous = false;

    public function actionIndex(): \craft\web\Response
    {
        return $this->asJson([
            ...$this->_getRouteContextActions(),
            ...$this->_getContextActions(),
            ...$this->_navigationActions(),
            // ...$this->_adminActions(),
            ...$this->_utilityActions(),
            ...$this->_userActions(),
            ...$this->_customActions(),
        ]);
    }

    /**
     * Return a static list of user actions available to all users regardless of permissions
     */
    private function _userActions(): array
    {
        return [
            [
                'type' => 'link',
                'name' => 'Edit your profile',
                'subtitle' => 'User',
                'icon' => 'UserCircleIcon',
                'url' => UrlHelper::cpUrl('myaccount'),
            ],
            [
                'type' => 'link',
                'name' => 'Logout',
                'subtitle' => 'User',
                'icon' => 'LogoutIcon',
                'url' => UrlHelper::siteUrl(
                    Craft::$app->getConfig()->getGeneral()->getLogoutPath()
                ),
            ],
        ];
    }

    /**
     * Return a list of the navigation items available to the signed in user
     */
    private function _navigationActions(): array
    {
        $actions = collect((new Cp())->nav())
            ->map(function ($i) {
                $url = str_replace(
                    UrlHelper::baseUrl(),
                    '',
                    $i['url']
                );

                return [
                    'type' => 'link',
                    'name' => $i['label'],
                    'subtitle' => '',
                    'icon' => 'MenuIcon',
                    'badgeCount' => ($i['badgeCount'] && $i['badgeCount'] > 0)
                            ? $i['badgeCount']
                            : null,
                    'url' => UrlHelper::cpUrl($url),
                ];
            });

        // Only include an action to go to the homepage if we're on the control panel
        if ($this->_isCpRequest()) {
            $actions->prepend([
                'type' => 'link',
                'name' => Craft::$app->getSystemName(),
                'subtitle' => 'Go to '.UrlHelper::siteUrl(),
                'icon' => 'GlobeAltIcon',
                'url' => UrlHelper::siteUrl(),
            ]);
        }

        return $actions->toArray();
    }

    /**
     * Return a list of the utility sections available to the signed in user
     */
    private function _utilityActions(): array
    {
        return collect(Craft::$app->getUtilities()->getAuthorizedUtilityTypes())
            ->map(fn ($class) => [
                'type' => 'link',
                'name' => $class::displayName(),
                'subtitle' => 'Utilities',
                'icon' => 'AdjustmentsIcon',
                'badgeCount' => ($class::badgeCount() && $class::badgeCount() > 0)
                        ? $class::badgeCount()
                        : null,
                'url' => UrlHelper::cpUrl("utilities/{$class::id()}"),
            ])
            ->toArray();
    }

    /**
     * Add admin-level actions. Will return an empty array if the logged in user is not an admin
     */
    private function _adminActions(): array
    {
        /** @var User */
        $currentUser = Craft::$app->getUsers()->getUserById(
            Craft::$app->getUser()->identity->id
        );

        // Return nothing if the user isn't an admin
        if (! $currentUser->admin) {
            return [];
        }

        // Return nothing if the site doesn't allow admin changes
        if (! Craft::$app->getConfig()->getGeneral()->allowAdminChanges) {
            return [];
        }

        $fields = collect(Craft::$app->getFields()->getAllFields())
            ->map(fn ($i) => [
                'type' => 'link',
                'name' => $i->name,
                'subtitle' => "Fields > {$i->displayName()}",
                'icon' => 'CodeIcon',
                'url' => UrlHelper::cpUrl("settings/fields/edit/{$i->id}"),
            ])->toArray();

        $sections = collect(Craft::$app->entries->getAllSections())
            ->map(fn ($i) => [
                'type' => 'link',
                'name' => $i->name,
                'subtitle' => 'Sections > '.ucfirst($i->type),
                'icon' => 'CollectionIcon',
                'url' => UrlHelper::cpUrl("settings/sections/{$i->id}"),
            ])->toArray();

        $entryTypes = collect(Craft::$app->entries->getAllEntryTypes())
            ->map(fn ($i) => [
                'type' => 'link',
                'name' => $i->name,
                'subtitle' => 'Sections > Entry Types',
                'icon' => 'TableIcon',
                'url' => UrlHelper::cpUrl("settings/entry-types/{$i->id}"),
            ])->toArray();

        $settings = collect((new Cp())->settings())
            ->map(function ($i, $section) {
                return collect($i)->map(function ($item, $slug) use ($section) {
                    return [
                        'type' => 'link',
                        'name' => $item['label'],
                        'url' => $section === 'Plugins'
                            ? UrlHelper::cpUrl($item['url'])
                            : UrlHelper::cpUrl("settings/{$slug}"),
                        'icon' => $section === 'Plugins'
                            ? 'LightningBoltIcon'
                            : 'CogIcon',
                        'subtitle' => "Settings > $section",
                    ];
                })->toArray();
            })
            ->flatten(1)
            ->toArray();

        return [
            ...$settings,
            ...$sections,
            ...$entryTypes,
            ...$fields,
        ];
    }

    private function _getContextActions(): array
    {
        return [
            [
                'type' => 'context',
                'name' => 'Find content',
                'subtitle' => 'Query for entries, assets, and users across the site',
                'icon' => 'search',
                'url' => 'SEARCH_ENTRIES',
            ],
        ];
    }

    /**
     * Adds a list of actions that are contextual to the front-end page the user is on
     */
    private function _getRouteContextActions(): array
    {
        // Output an empty array if this is a control panel request
        if ($this->_isCpRequest()) {
            return [];
        }

        try {
            // Unfortunately the only way to find the entry the user is on is by getting the referring URL
            $referrer = Craft::$app->getRequest()->referrer;

            // Normalize the referrer and the Craft base URL
            $referrer = rtrim($referrer, '/').'/';
            $url = rtrim(UrlHelper::baseUrl(), '/').'/';

            // Pluck out the URI using the referrer and the Craft base URL
            $uri = str_replace($url, '', $referrer);

            // Normalize the URI
            $uri = rtrim($uri, '/');

            // Remove any query strings and decode any special characters
            $uri = UrlHelper::stripQueryString($uri);
            $uri = urldecode($uri);

            // Find the matching element in Craft
            $element = Craft::$app->getElements()->getElementByUri($uri);

            // Return an empty array if no element was found
            if (! $element) {
                return [];
            }

            return [
                [
                    'type' => 'link',
                    'name' => $element->title,
                    'url' => $element->getCpEditUrl(),
                    'subtitle' => 'Edit this element within Craft',
                    'icon' => 'PencilAltIcon',
                ],
            ];
        } catch (\Exception $e) {
            return [];
        }
    }

    /**
     * Checks if the request was a control panel request
     */
    private function _isCpRequest(): bool
    {
        // Check the referring URL (it's the only way to know what page called the action)
        $referrer = Craft::$app->getRequest()->referrer;

        $uri = str_replace(
            UrlHelper::baseUrl(),
            '',
            $referrer
        );

        // Parse the segments from the URI
        $segments = explode('/', $uri);

        // If the first segment is the cpTrigger we know this is a control panel request
        if ($segments && $segments[0] === Craft::$app->getConfig()->getGeneral()->cpTrigger) {
            return true;
        }

        return false;
    }

    /**
     * Parses the custom URLs defined by a user and maps them back into a valid Palette structure
     */
    private function _customActions(): array
    {
        $customUrls = Palette::getInstance()->getSettings()->customUrls;

        // If the user supplied a closure we need to invoke it and get the result
        if ($customUrls instanceof \Closure) {
            $customUrls = $customUrls();
        }

        return collect($customUrls)
            ->map(fn ($item) => [
                'type' => 'link',
                'name' => $item['name'] ?? '',
                'url' => $item['url'] ?? '',
                'subtitle' => $item['subtitle'] ?? '',
            ])
            ->toArray();
    }
}
