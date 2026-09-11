import { Form, usePage } from '@inertiajs/react';

import { useTranslations } from '@/hooks/use-translations';
import avatar from '@/images/Avatar.png';
import { store as storeComment } from '@/wayfinder/routes/quotes/comments';

type CommentFormProps = {
    quoteId: number;
};

const CommentForm = ({ quoteId }: CommentFormProps) => {
    const { auth } = usePage().props;
    const { quotes: t } = useTranslations();

    return (
        <Form
            {...storeComment.form(quoteId)}
            options={{ preserveScroll: true }}
            resetOnSuccess
            className="flex items-center gap-4"
        >
            {({ errors, processing }) => (
                <>
                    <img
                        src={auth.user.avatar || avatar}
                        alt=""
                        className="size-10 shrink-0 rounded-full object-cover"
                    />
                    <div className="min-w-0 flex-1">
                        <input
                            name="comment"
                            placeholder={t.comment_placeholder}
                            disabled={processing}
                            className="w-full rounded-lg bg-white/10 px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/50"
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
                        className="sr-only"
                    >
                        {t.comment_submit}
                    </button>
                </>
            )}
        </Form>
    );
};

export default CommentForm;
