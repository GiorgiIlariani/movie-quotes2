import { usePage } from '@inertiajs/react';
import { useState } from 'react';

import MainLayout from '@/components/MainLayout/MainLayout';
import MovieModal from '@/components/modals/MovieModal/MovieModal';
import type { Movie } from '@/types';

import MovieDetails from './components/MovieDetails';

type MoviePageProps = {
    movie: {
        data: Movie;
    };
};

const MoviePage = ({ movie: { data } }: MoviePageProps) => {
    const [modalOpen, setModalOpen] = useState(false);
    const { locale } = usePage().props;

    return (
        <MainLayout>
            <h2 className="mb-4 hidden text-2xl font-medium text-white lg:block">
                Movie description
            </h2>
            <div className="grid gap-8 px-8 lg:px-0 xl:grid-cols-2">
                <img
                    src={data.cover}
                    alt="movie cover"
                    className="aspect-6/5 w-full rounded-xl object-cover lg:aspect-video"
                />

                <MovieDetails
                    id={data.id}
                    title={data.title[locale]}
                    director={data.director[locale]}
                    description={data.description[locale]}
                    release_year={data.release_year}
                    onOpenModal={() => setModalOpen(true)}
                />
            </div>

            <MovieModal
                open={modalOpen}
                onOpenChange={setModalOpen}
                variant="update"
                movieId={data.id}
                defaults={{
                    title_en: data.title.en,
                    title_ka: data.title.ka,
                    director_en: data.director.en,
                    director_ka: data.director.ka,
                    description_en: data.description.en,
                    description_ka: data.description.ka,
                    release_year: data.release_year,
                }}
            />
        </MainLayout>
    );
};

export default MoviePage;
