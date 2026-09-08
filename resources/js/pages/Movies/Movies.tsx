import { PlusSquare } from 'lucide-react';
import { useState } from 'react';

import MainLayout from '@/components/MainLayout/MainLayout';
import { useTranslations } from '@/hooks/use-translations';
import type { Movie } from '@/types';

import MovieCard from './components/MovieCard';
import { CreateMovieModal } from './components/MovieModal';

type MoviesPageProps = {
    movies: {
        data: Movie[];
    };
};

const Movies = ({ movies }: MoviesPageProps) => {
    const [createOpen, setCreateOpen] = useState(false);
    const { movies: t } = useTranslations();

    return (
        <MainLayout>
            <div className="flex items-center justify-between gap-1 px-8">
                <h2 className="flex flex-col gap-1 px-1 text-2xl font-medium text-white lg:flex-row lg:items-center">
                    <span className="mr-2">{t.my_list}</span>
                    <span className="text-sm lg:text-2xl">
                        {t.total.replace(':count', String(movies.data.length))}
                    </span>
                </h2>
                <button
                    type="button"
                    onClick={() => setCreateOpen(true)}
                    className="actionBtn flex items-center gap-2 bg-brand px-2! py-2! hover:bg-brand/90"
                >
                    <PlusSquare className="size-5" strokeWidth={2} />
                    <span>{t.add_movie}</span>
                </button>
            </div>

            <CreateMovieModal open={createOpen} onOpenChange={setCreateOpen} />
            <section className="mt-6 grid gap-15 px-8 sm:grid-cols-2 xl:grid-cols-3">
                {movies.data.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </section>
        </MainLayout>
    );
};

export default Movies;
