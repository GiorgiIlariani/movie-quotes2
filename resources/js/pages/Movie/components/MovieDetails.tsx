import { Form } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';

import { destroy } from '@/wayfinder/routes/movies';

type Props = {
    id: number;
    title: string;
    release_year: number;
    director: string;
    description: string;
    onOpenModal: () => void;
};

const MovieDetails = ({
    title,
    release_year,
    id,
    director,
    description,
    onOpenModal,
}: Props) => {
    return (
        <section className="flex min-w-0 flex-col gap-4 wrap-break-word">
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-medium text-cream">
                    {title}
                    <span className="ml-2">({release_year})</span>
                </h3>

                <div className="flex w-max items-center justify-between gap-3 rounded-xl bg-surface px-4 py-2">
                    <button
                        type="button"
                        onClick={onOpenModal}
                        className="cursor-pointer"
                    >
                        <Pencil className="size-4.5" />
                    </button>

                    <div className="h-4 w-px bg-white" />

                    <Form action={destroy(id)}>
                        <button type="submit" className="cursor-pointer">
                            <Trash2 className="size-4.5" />
                        </button>
                    </Form>
                </div>
            </div>
            <p className="text-lg font-bold text-white">
                Director:
                <span className="ml-2 font-medium">{director}</span>
            </p>
            <p className="text-lg text-border">{description}</p>
        </section>
    );
};

export default MovieDetails;
