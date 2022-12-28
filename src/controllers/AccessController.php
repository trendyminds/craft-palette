<?php

namespace trendyminds\palette\controllers;

use Craft;
use craft\web\Controller;
use trendyminds\palette\assetbundles\PaletteBundle;

class AccessController extends Controller
{
    protected array|int|bool $allowAnonymous = true;

    public function actionIndex(): \craft\web\Response
    {
        // We don't want to do anything for anonymous users
        if (Craft::$app->user->isGuest) {
            return $this->asJson('');
        }

        // We don't want to do anything if the user has no defined identity
        if (! Craft::$app->user->identity) {
            return $this->asJson('');
        }

        // We don't want to do anything for users without control panel access
        if (! Craft::$app->user->identity->can('accessCp')) {
            return $this->asJson('');
        }

        // Register the asset bundle for users who should see Palette and pass along the references
        $bundle = Craft::$app->getView()->registerAssetBundle(PaletteBundle::class);

        return $this->asJson([
            'css' => "{$bundle->baseUrl}/{$bundle->css[0]}",
            'js' => "{$bundle->baseUrl}/{$bundle->js[0]}",
        ]);
    }
}
