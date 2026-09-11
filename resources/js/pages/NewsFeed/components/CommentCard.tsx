import { Form, usePage } from '@inertiajs/react';

import { useTranslations } from '@/hooks/use-translations';
import avatar from '@/images/Avatar.png';
import type { QuoteComment } from '@/types';
import { destroy as destroyComment } from '@/wayfinder/routes/comments';

type CommentCardProps = {
    comment: QuoteComment;
};

const CommentCard = ({ comment }: CommentCardProps) => {
    const { auth } = usePage().props;
    const { quotes: t } = useTranslations();

    return (
        <li className="group flex items-start gap-4">
            <img
                src={comment.user?.avatar || avatar}
                alt=""
                className="size-10 shrink-0 rounded-full object-cover"
            />
            <div className="w-full min-w-0 flex-1 border-b border-white/70 pb-4">
                <p className="text-white">{comment.user?.name}</p>
                <p className="text-sm text-white/70">{comment.comment}</p>
            </div>
            {/* {comment.user?.id === auth.user.id ? (
                <Form
                    {...destroyComment.form(comment.id)}
                    options={{ preserveScroll: true }}
                >
                    <button
                        type="submit"
                        className="cursor-pointer text-sm text-white/50 opacity-0 transition-opacity group-hover:opacity-100 hover:text-white"
                    >
                        {t.delete_comment}
                    </button>
                </Form>
            ) : null} */}
        </li>
    );
};

export default CommentCard;
