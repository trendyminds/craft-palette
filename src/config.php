<?php

/**
 * Palette config.php
 *
 * This file exists only as a template for the Palette settings.
 * It does nothing on its own.
 *
 * Don't edit this file, instead copy it to 'craft/config' as 'palette.php'
 * and make your changes there to override default settings.
 *
 * Once copied to 'craft/config', this file will be multi-environment aware as
 * well, so you can have different settings groups for each environment, just as
 * you do for 'general.php'
 */

return [
    // If Palette should be enabled on the frontend of the website
    'enableOnFrontend' => true,

    // If Palette should be enabled on the backend of the website
    'enableOnBackend' => true,

    /**
     * Custom URLs to include in Palette's list
     *
     * This can be a simple set of array values:
     * 'customUrls' => [
     *     ['name' => 'My URL', 'url' => '/path/to/url', 'subtitle' => 'Optional text'],
     *  ],
     *
     * Or it can utilize a closure for something more dynamic:
     * 'customUrls' => function() {
     *     $url = '/path/to/url';
     *     return [
     *         ['name' => 'My URL', 'url' => $url, 'subtitle' => 'Optional text']
     *     ];
     * }
     */
    'customUrls' => [],

    /**
     * Used if your Craft install is within a subfolder of your webroot
     *
     * (e.g. http://example.com/mycraft instead of http://example.com)
     * 'baseUrl' => '/mycraft',
     *
     * You likely have an .env variable that you can use here. For example:
     * 'baseUrl' => \craft\helpers\App::env('SITE_URL'),
     *
     * When left as `null` Palette will load scripts from the webroot.
     */
    'baseUrl' => null,
];
