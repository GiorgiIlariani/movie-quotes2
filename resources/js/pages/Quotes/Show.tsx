import MainLayout from '@/components/MainLayout/MainLayout';
import QuoteCard from '@/pages/NewsFeed/components/QuoteCard';
import type { Quote } from '@/types';

type QuoteShowPageProps = {
    quote: {
        data: Quote;
    };
};

const QuoteShow = ({ quote }: QuoteShowPageProps) => {
    return (
        <MainLayout>
            <section className="mx-auto mt-6 flex w-full max-w-2xl flex-col lg:px-0">
                <QuoteCard quote={quote.data} />
            </section>
        </MainLayout>
    );
};

export default QuoteShow;
