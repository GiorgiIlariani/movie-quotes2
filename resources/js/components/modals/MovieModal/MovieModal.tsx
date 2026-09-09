import { usePage } from '@inertiajs/react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useTranslations } from '@/hooks/use-translations';
import Avatar from '@/images/Avatar.png';

import type { MovieFormDefaults, MovieFormVariant } from './helper';
import MovieForm from './MovieForm';

type SharedProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    defaults?: MovieFormDefaults;
};

type MovieModalProps =
    | (SharedProps & { variant: Extract<MovieFormVariant, 'store'> })
    | (SharedProps & {
          variant: Extract<MovieFormVariant, 'update'>;
          movieId: number;
      });

const MovieModal = (props: MovieModalProps) => {
    const { open, onOpenChange, defaults, variant } = props;
    const user = usePage().props.auth.user;
    const { movies } = useTranslations();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                overlayClassName="bg-black/10 supports-backdrop-filter:backdrop-blur-none"
                className="max-h-[90vh] w-full max-w-4xl scrollbar-none overflow-y-auto bg-background px-0 py-8 text-white ring-0 **:data-[slot=dialog-close]:text-white"
            >
                <DialogHeader className="items-center border-b border-gray-500 pb-8 text-center">
                    <DialogTitle className="text-2xl font-medium text-white">
                        {movies.add_movie_title}
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                        {movies.add_movie_description}
                    </DialogDescription>
                </DialogHeader>

                <div className="my-4 flex items-center gap-3 px-12">
                    <img
                        src={user?.avatar ?? Avatar}
                        alt={movies.user_profile}
                        className="size-10 rounded-full object-cover"
                    />
                    <p className="text-base text-white">{user.name}</p>
                </div>

                {variant === 'update' ? (
                    <MovieForm
                        variant="update"
                        movieId={props.movieId}
                        defaults={defaults}
                        onOpenChange={onOpenChange}
                    />
                ) : (
                    <MovieForm
                        variant="store"
                        defaults={defaults}
                        onOpenChange={onOpenChange}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};

export default MovieModal;
