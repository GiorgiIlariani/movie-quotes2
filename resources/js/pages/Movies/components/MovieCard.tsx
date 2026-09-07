import { Link } from '@inertiajs/react';

import type { Movie } from '@/types';

type MovieCardProps = {
    movie: Movie;
};

const MovieCard = ({ movie }: MovieCardProps) => {
    return (
        <div className="flex flex-col gap-4">
            <Link href="#">
                <img
                    src={movie.cover}
                    alt={movie.title_en}
                    className="aspect-6/5 rounded-xl"
                />
            </Link>

            <Link href="#" className="flex gap-2 text-2xl font-medium">
                <p>{movie.title_en}</p>
                <span>({movie.release_year})</span>
            </Link>

            <div>num of quotes</div>
        </div>
    );
};

export default MovieCard;
