import { useState } from 'react';
import { Pencil } from 'lucide-react';

import MainLayout from '@/components/MainLayout/MainLayout';
import QuoteModal from '@/components/modals/QuoteModal/QuoteModal';
import { useTranslations } from '@/hooks/use-translations';
import type { Quote } from '@/types';
import { InfiniteScroll } from '@inertiajs/react';

import QuoteCard from './components/QuoteCard';

type NewsFeedPageProps = {
    quotes: {
        data: Quote[];
    };
};

const NewsFeed = ({ quotes }: NewsFeedPageProps) => {
    const { quotes: t } = useTranslations();
    const [quoteModalOpen, setQuoteModalOpen] = useState(false);

    return (
        <MainLayout>
            <div className="mx-auto flex w-full max-w-4xl flex-col items-start gap-8 lg:mx-0 lg:px-0">
                <button
                    type="button"
                    onClick={() => setQuoteModalOpen(true)}
                    className="actionBtn flex w-full items-center gap-2 rounded-xl! p-2 py-4! text-xl lg:bg-surface"
                >
                    <Pencil className="size-5" strokeWidth={2} />
                    {t.write_new_quote}
                </button>

                {quotes.data.length === 0 ? (
                    <p className="text-white/70">{t.empty_feed}</p>
                ) : (
                    <InfiniteScroll data="quotes">
                        <section className="flex w-full flex-col items-start gap-8">
                            {quotes.data.map((quote) => (
                                <QuoteCard key={quote.id} quote={quote} />
                            ))}
                        </section>
                    </InfiniteScroll>
                )}
            </div>

            <QuoteModal
                open={quoteModalOpen}
                onOpenChange={setQuoteModalOpen}
                variant="store"
            />
        </MainLayout>
    );
};

export default NewsFeed;
