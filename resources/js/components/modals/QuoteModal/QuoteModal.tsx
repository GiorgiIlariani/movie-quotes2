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

import type { MovieProps } from './helper';
import QuoteForm from './QuoteForm';

type QuoteModalProps = MovieProps & {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    variant: 'store' | 'update';
};

const QuoteModal = ({
    open,
    onOpenChange,
    movieId,
    movieAuthor,
    movieCover,
    movieYear,
    movieTitle,
    variant,
}: QuoteModalProps) => {
    const user = usePage().props.auth.user;
    const { quotes } = useTranslations();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                overlayClassName="bg-black/10 supports-backdrop-filter:backdrop-blur-none"
                className="max-h-[90vh] w-full max-w-4xl scrollbar-none overflow-y-auto bg-background py-8 text-white ring-0 **:data-[slot=dialog-close]:text-white"
            >
                <DialogHeader className="flex items-center justify-center border-b border-white/30 px-9 py-6 font-medium">
                    <DialogTitle className="text-xl">
                        {quotes.new_quote}
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                        {quotes.new_quote_description}
                    </DialogDescription>
                </DialogHeader>

                <section className="mt-6 px-9">
                    <div className="flex items-center gap-2">
                        <img
                            src={user.avatar || Avatar}
                            alt={user.name}
                            className="h-10 w-10 rounded-full object-cover"
                        />

                        <p className="text-xl text-white">{user.name}</p>
                    </div>

                    <QuoteForm
                        movieAuthor={movieAuthor}
                        movieYear={movieYear}
                        movieCover={movieCover}
                        movieId={movieId}
                        movieTitle={movieTitle}
                        variant={variant}
                        onOpenChange={onOpenChange}
                    />
                </section>
            </DialogContent>
        </Dialog>
    );
};

export default QuoteModal;
