<?php

namespace trendyminds\palette;

use craft\base\Model;

class Settings extends Model
{
    /**
     * @var bool If Palette should be enabled on the frontend of the website
     */
    public $enableOnFrontend = true;

    /**
     * @var bool If Palette should be enabled on the backend of the website
     */
    public $enableOnBackend = true;
}
