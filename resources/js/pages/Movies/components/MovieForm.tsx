import { Form } from '@inertiajs/react';

import { useTranslations } from '@/hooks/use-translations';
import { store } from '@/wayfinder/routes/movies';

import { movieFormFields } from '../helper';
import { MovieTextArea } from './MovieTextArea';
import { MovieTextField } from './MovieTextField';

type Props = {
    onOpenChange: (open: boolean) => void;
};

const MovieForm = ({ onOpenChange }: Props) => {
    const { movies } = useTranslations();

    return (
        <Form
            action={store()}
            encType="multipart/form-data"
            className="mx-auto flex w-full flex-col gap-4 px-12"
            onSuccess={() => onOpenChange(false)}
        >
            {({ errors, processing }) => (
                <>
                    {movieFormFields.map((field) =>
                        field.type === 'textarea' ? (
                            <MovieTextArea
                                key={field.id}
                                id={field.id}
                                label={movies[field.id]}
                                lang={field.lang}
                                error={errors[field.id]}
                            />
                        ) : (
                            <MovieTextField
                                key={field.id}
                                id={field.id}
                                label={movies[field.id]}
                                lang={field.lang}
                                type={field.type}
                                error={errors[field.id]}
                            />
                        ),
                    )}

                    <button
                        type="submit"
                        disabled={processing}
                        className="actionBtn mt-4 w-full bg-brand py-2! hover:bg-brand/90 disabled:opacity-60"
                    >
                        {movies.add_movie}
                    </button>
                </>
            )}
        </Form>
    );
};

export default MovieForm;
