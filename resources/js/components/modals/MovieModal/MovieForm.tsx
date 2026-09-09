import { Form } from '@inertiajs/react';

import { useTranslations } from '@/hooks/use-translations';
import { store, update } from '@/wayfinder/routes/movies';

import type { MovieFormDefaults } from './helper';
import { movieFormFields } from './helper';
import { MovieTextArea } from './MovieTextArea';
import { MovieTextField } from './MovieTextField';

type SharedProps = {
    onOpenChange: (open: boolean) => void;
    defaults?: MovieFormDefaults;
};

type Props =
    | (SharedProps & { variant: 'store' })
    | (SharedProps & { variant: 'update'; movieId: number });

const MovieForm = (props: Props) => {
    const { onOpenChange, variant, defaults } = props;
    const { movies } = useTranslations();
    const form =
        props.variant === 'store' ? store.form() : update.form(props.movieId);

    return (
        <Form
            {...form}
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
                                defaultValue={defaults?.[field.id]}
                                error={errors[field.id]}
                                variant={variant}
                            />
                        ) : (
                            <MovieTextField
                                key={field.id}
                                id={field.id}
                                label={movies[field.id]}
                                lang={field.lang}
                                type={field.type}
                                defaultValue={defaults?.[field.id]}
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
