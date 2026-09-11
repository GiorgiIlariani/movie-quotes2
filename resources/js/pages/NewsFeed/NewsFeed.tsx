import { Form } from '@inertiajs/react';
import { useEchoPublic } from '@laravel/echo-react';

import MainLayout from '@/components/MainLayout/MainLayout';
import { useTranslations } from '@/hooks/use-translations';
import type { Quote } from '@/types';
import { ping } from '@/wayfinder/routes/news_feed';

import QuoteCard from './components/QuoteCard';
import { useConnectionStatus } from '@laravel/echo-react';

// "connected" | "connecting" | "reconnecting" | "disconnected" | "failed"

type TestPingPayload = {
    kind: string;
    message: string;
    number: number;
};

type NewsFeedPageProps = {
    quotes: {
        data: Quote[];
    };
    testPing?: TestPingPayload | null;
};

const NewsFeed = ({ quotes, testPing }: NewsFeedPageProps) => {
    const { quotes: t } = useTranslations();

    useEchoPublic<TestPingPayload>('testing', 'TestPing', (e) => {
        console.log('gg');
    });

    return (
        <MainLayout>
            <div className="mb-6 flex flex-col gap-3 px-8 lg:px-0">
                <Form {...ping.form()} options={{ preserveScroll: true }}>
                    <button
                        type="submit"
                        className="actionBtn bg-brand px-4 py-2 hover:bg-brand/90"
                    >
                        Fire random event
                    </button>
                </Form>
                {testPing ? (
                    <p className="text-sm text-cream">
                        {testPing.kind} · {testPing.number} · {testPing.message}
                    </p>
                ) : (
                    <p className="text-sm text-white/50">
                        Last event will show here after you click.
                    </p>
                )}
            </div>

            {quotes.data.length === 0 ? (
                <p className="mt-6 px-8 text-white/70 lg:px-0">
                    {t.empty_feed}
                </p>
            ) : (
                <section className="mx-auto mt-6 flex w-full max-w-2xl flex-col gap-8 lg:px-0">
                    {quotes.data.map((quote) => (
                        <QuoteCard key={quote.id} quote={quote} />
                    ))}
                </section>
            )}
        </MainLayout>
    );
};

export default NewsFeed;
