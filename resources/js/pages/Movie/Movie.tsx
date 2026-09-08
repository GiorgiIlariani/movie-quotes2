import { useState } from 'react';

import MainLayout from '@/components/MainLayout/MainLayout';
import MovieModal from '@/components/modals/MovieModal';
import type { Movie } from '@/types';

import MovieDetails from './components/MovieDetails';

type MoviePageProps = {
    movie: {
        data: Movie;
    };
};

const MoviePage = ({ movie: { data } }: MoviePageProps) => {
    const [modalOpen, setModalOpen] = useState(false);

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
                    {...data}
                    onOpenModal={() => setModalOpen(true)}
                />
            </div>

            <MovieModal open={modalOpen} onOpenChange={setModalOpen} />
        </MainLayout>
    );
};

export default MoviePage;
