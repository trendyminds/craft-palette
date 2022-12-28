<?php

namespace trendyminds\palette\assetbundles;

use craft\web\AssetBundle;

class AccessBundle extends AssetBundle
{
    public function init()
    {
        $this->sourcePath = '@trendyminds/palette/assetbundles/resources';
        $this->js = ['access.js'];
        $this->jsOptions = ['defer' => true];

        parent::init();
    }
}
