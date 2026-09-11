import { InfiniteScroll, usePage } from '@inertiajs/react';
import { PlusSquare } from 'lucide-react';
import { useState } from 'react';

import MainLayout from '@/components/MainLayout/MainLayout';
import MovieModal from '@/components/modals/MovieModal/MovieModal';
import QuoteModal from '@/components/modals/QuoteModal/QuoteModal';
import { useTranslations } from '@/hooks/use-translations';
import type { Movie, Quote } from '@/types';

import MovieDetails from './components/MovieDetails';
import QuoteCard from './components/QuoteCard';

type MoviePageProps = {
    movie: {
        data: Movie;
    };
    quotes: {
        data: Quote[];
    };
};

const MoviePage = ({ movie: { data }, quotes }: MoviePageProps) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [quoteModalOpen, setQuoteModalOpen] = useState(false);
    const { locale } = usePage().props;
    const { quotes: t } = useTranslations();

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

            <div className="mt-4 px-8 lg:px-0">
                <button
                    onClick={() => setQuoteModalOpen(true)}
                    className="actionBtn flex items-center gap-2 bg-brand"
                >
                    <PlusSquare className="size-5" strokeWidth={2} />{' '}
                    {t.add_quote}
                </button>

                <div className="mt-6 h-px w-full bg-white" />
            </div>

            <QuoteModal
                onOpenChange={setQuoteModalOpen}
                open={quoteModalOpen}
                movieId={data.id}
                movieAuthor={data.director[locale]}
                movieCover={data.cover}
                movieYear={data.release_year}
                movieTitle={data.title[locale]}
                variant="store"
            />

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
                    cover: data.cover,
                }}
            />

            <InfiniteScroll data="quotes">
                <section className="mt-6 flex w-full max-w-4xl flex-col gap-8 px-8 lg:px-0">
                    {quotes.data.map((quote) => (
                        <QuoteCard
                            key={quote.id}
                            quote={quote}
                            locale={locale}
                        />
                    ))}
                </section>
            </InfiniteScroll>
        </MainLayout>
    );
};

export default MoviePage;
