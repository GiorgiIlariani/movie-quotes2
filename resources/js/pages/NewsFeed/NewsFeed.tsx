import MainLayout from '@/components/MainLayout/MainLayout';
import { useTranslations } from '@/hooks/use-translations';
import type { Quote } from '@/types';

import QuoteCard from './components/QuoteCard';

type NewsFeedPageProps = {
    quotes: {
        data: Quote[];
    };
};

const NewsFeed = ({ quotes }: NewsFeedPageProps) => {
    const { nav, quotes: t } = useTranslations();

    return (
        <MainLayout>
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
