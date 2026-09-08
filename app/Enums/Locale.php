<?php

namespace App\Enums;

enum Locale: string
{
    case En = 'en';
    case Ka = 'ka';

    public static function current(): self
    {
        return self::tryFrom(app()->getLocale()) ?? self::En;
    }
}
