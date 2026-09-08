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

import MovieForm from './MovieForm';

type CreateMovieModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export const CreateMovieModal = ({
    open,
    onOpenChange,
}: CreateMovieModalProps) => {
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

                <MovieForm onOpenChange={onOpenChange} />
            </DialogContent>
        </Dialog>
    );
};
