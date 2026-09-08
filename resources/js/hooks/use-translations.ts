import { usePage } from '@inertiajs/react';

import type { Translations } from '@/types/translations';

export function useTranslations(): Translations {
    return usePage().props.translations;
}
