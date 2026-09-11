import { Form } from '@inertiajs/react';
import { Heart, MessageCircle } from 'lucide-react';

import { useTranslations } from '@/hooks/use-translations';
import CommentCard from '@/pages/NewsFeed/components/CommentCard';
import CommentForm from '@/pages/NewsFeed/components/CommentForm';
import type { Quote } from '@/types';
import { store as storeLike } from '@/wayfinder/routes/quotes/likes';

type Props = {
    quote: Quote;
    locale: 'en' | 'ka';
};

const QuoteCard = ({ quote, locale }: Props) => {
    const { quotes: t } = useTranslations();

    return (
        <div className="flex max-w-3xl flex-col gap-6 rounded-lg bg-background p-6">
            <article className="flex items-center gap-6 border-b border-white/30 pb-6">
                <img
                    src={quote.cover!}
                    alt="quote cover"
                    className="aspect-3/2 w-full max-w-2xs"
                />
                <p className="text-lg font-medium">"{quote.quote[locale]}"</p>
            </article>

            <div className="flex items-center gap-6">
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
        </div>
    );
};

export default QuoteCard;
