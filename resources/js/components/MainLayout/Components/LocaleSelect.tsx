import { Form, usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { useTranslations } from '@/hooks/use-translations';
import { cn } from '@/lib/utils';
import type { LocaleTranslations } from '@/types/translations';
import { update as updateLocale } from '@/wayfinder/App/Http/Controllers/LocaleController';

const locales: (keyof LocaleTranslations)[] = ['en', 'ka'];

const LocaleSelect = () => {
    const { locale } = usePage().props;
    const { header, locale: localeLabels } = useTranslations();

    return (
        <Popover>
            <PopoverTrigger
                aria-label={header.language}
                className="flex cursor-pointer items-center gap-1 bg-transparent text-white outline-none"
            >
                {localeLabels[locale]}
                <ChevronDown className="size-4" />
            </PopoverTrigger>
            <PopoverContent
                align="center"
                className="w-auto min-w-24 gap-1 p-2"
            >
                <Form action={updateLocale()} className="flex flex-col gap-1">
                    {locales.map((value) => (
                        <button
                            key={value}
                            type="submit"
                            name="locale"
                            value={value}
                            className={cn(
                                'cursor-pointer rounded-md px-3 py-1.5 text-left text-white hover:bg-white/10',
                                locale === value && 'text-cream',
                            )}
                        >
                            {localeLabels[value]}
                        </button>
                    ))}
                </Form>
            </PopoverContent>
        </Popover>
    );
};

export default LocaleSelect;
