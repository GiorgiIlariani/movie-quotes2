import { useHttp, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useTranslations } from '@/hooks/use-translations';
import type { MovieOption } from '@/types';
import { options as movieOptions } from '@/wayfinder/routes/movies';

type MovieOptionsResponse = {
    data: MovieOption[];
};

const MovieSelector = () => {
    const { locale } = usePage().props;
    const { quotes } = useTranslations();
    const { get, processing, response } = useHttp<
        Record<string, never>,
        MovieOptionsResponse
    >({});

    useEffect(() => {
        void get(movieOptions.url());
    }, [get]);

    const items = (response?.data ?? []).map((movie) => ({
        value: String(movie.id),
        label: `${movie.title[locale]} (${movie.release_year})`,
    }));

    return (
        <Select
            name="movie_id"
            items={items}
            required
            modal={false}
            disabled={processing}
        >
            <SelectTrigger className="h-auto min-h-12 w-full rounded-md border-border/70 bg-transparent px-4 py-3 text-sm text-white data-placeholder:text-white/70 data-placeholder:italic">
                <SelectValue placeholder={quotes.select_movie} />
            </SelectTrigger>
            <SelectContent
                alignItemWithTrigger={false}
                className="bg-background text-white ring-white/20"
            >
                {items.map((item) => (
                    <SelectItem
                        key={item.value}
                        value={item.value}
                        className="text-white data-highlighted:bg-white/10 data-highlighted:text-white"
                    >
                        {item.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default MovieSelector;
