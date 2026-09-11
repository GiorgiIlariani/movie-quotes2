import { Form, usePage } from '@inertiajs/react';
import { Heart, MessageCircle } from 'lucide-react';

import { useTranslations } from '@/hooks/use-translations';
import avatar from '@/images/Avatar.png';
import type { Quote } from '@/types';
import { store as storeLike } from '@/wayfinder/routes/quotes/likes';

import CommentCard from './CommentCard';
import CommentForm from './CommentForm';

type QuoteCardProps = {
    quote: Quote;
};

const QuoteCard = ({ quote }: QuoteCardProps) => {
    const { locale } = usePage().props;
    const { quotes: t } = useTranslations();

    return (
        <article className="flex flex-col gap-4 bg-background p-6 lg:rounded-xl">
            <div className="flex items-center gap-2">
                <img
                    src={quote.user?.avatar || avatar}
                    alt="quote cover"
                    className="h-10 w-10 rounded-full object-cover"
                />
                <p className="text-lg">{quote.user?.name}</p>
            </div>

            <div className="flex gap-1">
                <p>“{quote.quote[locale]}”</p>
                {quote.movie ? (
                    <div className="flex items-center">
                        <p className="text-cream">
                            - {quote.movie.title[locale]}
                        </p>
                        <span>({quote.movie.release_year})</span>
                    </div>
                ) : null}
            </div>

            {quote.cover ? (
                <img
                    src={quote.cover}
                    alt=""
                    className="aspect-video w-full rounded-lg object-cover"
                />
            ) : null}

            <div className="flex items-center gap-6 border-b border-white/70 pb-6">
                <div className="flex items-center gap-2 text-white">
                    <MessageCircle className="size-5" />
                    <span>{quote.comments_count ?? 0}</span>
                </div>

                <Form
                    {...storeLike.form(quote.id)}
                    options={{ preserveScroll: true }}
                >
                    <button
                        type="submit"
                        className="flex cursor-pointer items-center gap-2 text-white"
                        aria-label={quote.liked ? t.unlike : t.like}
                    >
                        <Heart
                            className={
                                quote.liked
                                    ? 'size-5 fill-brand text-brand'
                                    : 'size-5'
                            }
                        />
                        <span>{quote.likes_count ?? 0}</span>
                    </button>
                </Form>
            </div>

            {quote.comments && quote.comments.length > 0 ? (
                <ul className="flex flex-col gap-6">
                    {quote.comments.map((comment) => (
                        <CommentCard key={comment.id} comment={comment} />
                    ))}
                </ul>
            ) : null}

            <CommentForm quoteId={quote.id} />
        </article>
    );
};

export default QuoteCard;
