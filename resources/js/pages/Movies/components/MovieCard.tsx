import { Link, usePage } from '@inertiajs/react';

import { useTranslations } from '@/hooks/use-translations';
import type { Movie } from '@/types';
import { show } from '@/wayfinder/routes/movies';

type MovieCardProps = {
    movie: Movie;
};

const MovieCard = ({ movie }: MovieCardProps) => {
    const { movies } = useTranslations();
    const { locale } = usePage().props;

    return (
        <div className="flex flex-col gap-4">
            <Link href={show(movie.id)}>
                <img
                    src={movie.cover}
                    alt={movie.title[locale]}
                    className="aspect-6/5 rounded-xl object-cover"
                />
            </Link>

            <Link
                href={show(movie.id)}
                className="flex gap-2 text-2xl font-medium"
            >
                <p>{movie.title[locale]}</p>
                <span>({movie.release_year})</span>
            </Link>

            <div>{movies.quotes_count}</div>
        </div>
    );
};

export default MovieCard;
