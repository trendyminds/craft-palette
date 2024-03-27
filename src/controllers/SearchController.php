<?php

namespace trendyminds\palette\controllers;

use craft\elements\Asset;
use craft\elements\Entry;
use craft\elements\User;
use craft\web\Controller;

class SearchController extends Controller
{
    protected array|int|bool $allowAnonymous = false;

    public function actionIndex(string $query = ''): \craft\web\Response
    {
        $entries = Entry::find()->search($query)->section('*')->limit(10)->collect();
        $users = User::find()->search($query)->limit(10)->collect();
        $assets = Asset::find()->search($query)->limit(10)->collect();

        $results = collect([...$entries, ...$users, ...$assets])
            ->map(function ($result) {
                $title = $result->title;
                $subtitle = 'Entry';
                $icon = 'document';

                if ($result instanceof User) {
                    $title = $result->name;
                    $subtitle = 'User';
                    $icon = 'user';
                }

                if ($result instanceof Asset) {
                    $subtitle = 'Asset';
                    $icon = 'attachment';
                }

                return [
                    'name' => $title,
                    'type' => 'link',
                    'url' => $result->getCpEditUrl(),
                    'subtitle' => $subtitle,
                    'icon' => $icon,
                ];
            })->toArray();

        return $this->asJson($results);
    }
}
