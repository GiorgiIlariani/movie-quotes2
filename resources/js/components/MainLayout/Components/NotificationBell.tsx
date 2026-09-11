import { Link, router, useHttp, usePage } from '@inertiajs/react';
import { useEchoNotification } from '@laravel/echo-react';
import { useEffect } from 'react';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { useTranslations } from '@/hooks/use-translations';
import Bell from '@/images/icons/Bell.png';
import type { AppNotification } from '@/types';
import { index, read } from '@/wayfinder/routes/notifications';
import { show } from '@/wayfinder/routes/quotes';

type NotificationsResponse = {
    data: AppNotification[];
    unread_count: number;
};

const NotificationBell = () => {
    const { header } = useTranslations();
    const { auth } = usePage().props;
    const { get, response } = useHttp<
        Record<string, never>,
        NotificationsResponse
    >({});

    const notifications = response?.data ?? [];
    const unreadCount = response?.unread_count ?? 0;

    useEffect(() => {
        void get(index.url());
    }, [get]);

    useEchoNotification(
        `App.Models.User.${auth.user.id}`,
        () => {
            void get(index.url());
        },
        [],
        [get],
    );

    const handleOpenChange = (open: boolean) => {
        if (open && unreadCount > 0) {
            router.post(
                read.url(),
                {},
                {
                    preserveScroll: true,
                    preserveState: true,
                    onFinish: () => {
                        void get(index.url());
                    },
                },
            );
        }
    };

    return (
        <Popover onOpenChange={handleOpenChange}>
            <PopoverTrigger
                aria-label={header.notifications}
                className="relative cursor-pointer"
            >
                <img src={Bell} alt={header.notifications} className="size-6" />
                {unreadCount > 0 ? (
                    <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-brand text-[10px] leading-none text-white">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                ) : null}
            </PopoverTrigger>
            <PopoverContent
                align="end"
                className="max-h-96 w-80 overflow-y-auto p-2"
            >
                {notifications.length === 0 ? (
                    <p className="px-2 py-4 text-center text-white/50">
                        {header.no_notifications}
                    </p>
                ) : (
                    <ul className="flex flex-col gap-1">
                        {notifications.map((notification) => (
                            <li key={notification.id}>
                                <Link
                                    href={show.url(notification.quote_id)}
                                    className={`flex items-center gap-3 rounded-lg p-2 hover:bg-white/10 ${
                                        notification.read_at ? 'opacity-70' : ''
                                    }`}
                                >
                                    {notification.quote_cover ? (
                                        <img
                                            src={notification.quote_cover}
                                            alt=""
                                            className="size-12 shrink-0 rounded object-cover"
                                        />
                                    ) : (
                                        <div className="size-12 shrink-0 rounded bg-white/10" />
                                    )}
                                    <p className="text-sm text-white">
                                        <span className="font-medium">
                                            {notification.actor_name}
                                        </span>{' '}
                                        {notification.kind === 'comment'
                                            ? header.commented_on_your_quote
                                            : header.liked_your_quote}
                                    </p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </PopoverContent>
        </Popover>
    );
};

export default NotificationBell;
