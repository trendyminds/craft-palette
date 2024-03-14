<?php

namespace trendyminds\palette\assetbundles;

use craft\web\AssetBundle;

class PaletteBundle extends AssetBundle
{
    public function init()
    {
        $this->sourcePath = '@trendyminds/palette/assetbundles/resources';
        $this->js = ['Init.js'];
        $this->css = ['palette.css'];

        parent::init();
    }
}
