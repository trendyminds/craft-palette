<?php

namespace trendyminds\palette;

use Craft;
use craft\base\Plugin;
use craft\events\TemplateEvent;
use craft\web\View;
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

        // Don't load Palette if Craft is in offline mode
        if (! Craft::$app->getIsLive()) {
            return false;
        }

        // Don't load Palette if this is a frontend request and the frontend setting is disabled
        if (! $this->getSettings()->enableOnFrontend && Craft::$app->getRequest()->isSiteRequest) {
            return false;
        }

        // Don't load Palette if this is a backend request and the backend setting is disabled
        if (! $this->getSettings()->enableOnBackend && Craft::$app->getRequest()->isCpRequest) {
            return false;
        }

        // Register the asset bundle so our JS XHR can determine if the user is signed in or not
        Event::on(
            View::class,
            View::EVENT_BEFORE_RENDER_PAGE_TEMPLATE,
            function (TemplateEvent $event) {
                try {
                    Craft::$app->getView()->registerAssetBundle(AccessBundle::class);

                    // If the baseUrl was set we need to use that URL in our JS files for requests
                    // Otherwise, let's skip this part entirely and not try and set window-level properties
                    if (! is_null($this->getSettings()->baseUrl)) {
                        Craft::$app->getView()->registerJs(
                            "
                                window.palette = window.palette || {};
                                window.palette.baseUrl = '{$this->getSettings()->baseUrl}'
                            ",
                            View::POS_HEAD
                        );
                    }
                } catch (InvalidConfigException $e) {
                    Craft::error('Error registering Palette asset bundle');
                }
            }
        );
    }

    protected function createSettingsModel(): ?craft\base\Model
    {
        return new Settings();
    }
}
