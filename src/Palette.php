<?php

namespace trendyminds\palette;

use Craft;
use craft\web\View;
use craft\base\Plugin;
use craft\events\TemplateEvent;

use trendyminds\palette\assetbundles\AccessBundle;

use yii\base\Event;
use yii\base\InvalidConfigException;

class Palette extends Plugin
{
	public function init()
	{
		parent::init();

		// Define our alias for referencing the asset bundles (CSS/JS)
		Craft::setAlias('@trendyminds/palette', $this->getBasePath());

		// Register the asset bundle so our JS XHR can determine if the user is signed in or not
		Event::on(
			View::class,
			View::EVENT_BEFORE_RENDER_PAGE_TEMPLATE,
			function (TemplateEvent $event) {
				try {
					Craft::$app->getView()->registerAssetBundle(AccessBundle::class);
				} catch (InvalidConfigException $e) {
					Craft::error('Error registering Palette asset bundle');
				}
			}
		);
	}
}
