import { Form } from '@inertiajs/react';

import ImageUpload from '@/components/shared/ImageUpload';
import { useTranslations } from '@/hooks/use-translations';

import type { MovieProps } from './helper';
import MovieSelector from './MovieSelector';
import { QuoteTextArea } from './QuoteTextArea';
import { cn } from '@/lib/utils';
import { store } from '@/wayfinder/routes/quotes';

type Props = MovieProps & {
    variant: 'store' | 'update';
};

const QuoteForm = ({
    movieAuthor,
    movieYear,
    movieId,
    movieCover,
    movieTitle,
    variant,
}: Props) => {
    const { quotes, locale } = useTranslations();

    const flexDirection = variant === 'store' ? 'flex-col' : 'flex-col-reverse';

    return (
        <Form action={store()}>
            {movieId ? (
                <input type="hidden" name="movie_id" value={movieId} />
            ) : null}
            <div className={cn('mt-4 flex gap-4', flexDirection)}>
                {movieId ? (
                    <>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <img
                                src={movieCover}
                                alt="movie cover"
                                className="col-span-1 aspect-4/3 rounded-lg object-cover"
                            />

                            <div className="min-auto col-span-3 shrink-0">
                                <h3 className="text-lg text-cream uppercase">
                                    {movieTitle} <span>({movieYear})</span>
                                </h3>
                                <p className="mt-2 text-lg font-bold">
                                    Director: <span>{movieAuthor}</span>
                                </p>
                            </div>
                        </div>
                        <ImageUpload
                            hint={quotes.drag_image}
                            buttonLabel={quotes.choose_file}
                            changeLabel="change image"
                            name="quote_cover"
                        />
                    </>
                ) : (
                    <>
                        <ImageUpload
                            hint={quotes.drag_image}
                            buttonLabel={quotes.choose_file}
                            changeLabel="change image"
                            name="quote_cover"
                        />
                        <MovieSelector />
                    </>
                )}

                <QuoteTextArea
                    id="quote_en"
                    lang={locale.en}
                    placeholder={quotes.quote_en_placeholder}
                />
                <QuoteTextArea
                    id="quote_ka"
                    lang={locale.ka}
                    placeholder={quotes.quote_ka_placeholder}
                />
            </div>

            <button className="actionBtn mt-8 w-full bg-brand">Submit</button>
        </Form>
    );
};

export default QuoteForm;
