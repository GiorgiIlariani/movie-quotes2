import { Form, usePage } from '@inertiajs/react';
import { Heart, MessageCircle } from 'lucide-react';

import { useTranslations } from '@/hooks/use-translations';
import avatar from '@/images/Avatar.png';
import type { Quote } from '@/types';
import { destroy as destroyComment } from '@/wayfinder/routes/comments';
import { store as storeComment } from '@/wayfinder/routes/quotes/comments';
import { store as storeLike } from '@/wayfinder/routes/quotes/likes';

type QuoteCardProps = {
    quote: Quote;
};

const QuoteCard = ({ quote }: QuoteCardProps) => {
    const { locale, auth } = usePage().props;
    const { quotes: t } = useTranslations();

    return (
        <article className="flex flex-col gap-4 bg-black p-6">
            <div className="flex items-center gap-2">
                <img
                    src={quote.user?.avatar || avatar}
                    alt=""
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

            <div className="flex items-center gap-6">
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

                <div className="flex items-center gap-2 text-white">
                    <MessageCircle className="size-5" />
                    <span>{quote.comments_count ?? 0}</span>
                </div>
            </div>

            {quote.comments && quote.comments.length > 0 ? (
                <ul className="flex flex-col gap-3 border-t border-white/10 pt-4">
                    {quote.comments.map((comment) => (
                        <li
                            key={comment.id}
                            className="flex items-start justify-between gap-4"
                        >
                            <div>
                                <p className="text-sm font-medium">
                                    {comment.user?.name}
                                </p>
                                <p className="text-sm text-white/80">
                                    {comment.comment}
                                </p>
                            </div>
                            {comment.user?.id === auth.user.id ? (
                                <Form
                                    {...destroyComment.form(comment.id)}
                                    options={{ preserveScroll: true }}
                                >
                                    <button
                                        type="submit"
                                        className="cursor-pointer text-sm text-white/50 hover:text-white"
                                    >
                                        {t.delete_comment}
                                    </button>
                                </Form>
                            ) : null}
                        </li>
                    ))}
                </ul>
            ) : null}

            <Form
                {...storeComment.form(quote.id)}
                options={{ preserveScroll: true }}
                resetOnSuccess
                className="flex gap-2"
            >
                {({ errors, processing }) => (
                    <>
                        <div className="min-w-0 flex-1">
                            <input
                                name="comment"
                                placeholder={t.comment_placeholder}
                                className="w-full rounded-md border border-border/70 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-white/50"
                            />
                            {errors.comment ? (
                                <p className="mt-1 text-sm text-brand">
                                    {errors.comment}
                                </p>
                            ) : null}
                        </div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="actionBtn shrink-0 bg-brand disabled:opacity-60"
                        >
                            {t.comment_submit}
                        </button>
                    </>
                )}
            </Form>
        </article>
    );
};

export default QuoteCard;
