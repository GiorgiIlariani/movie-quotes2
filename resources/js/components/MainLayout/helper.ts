import { Clapperboard, House } from 'lucide-react';

import movies from '@/wayfinder/routes/movies';
import newsFeed from '@/wayfinder/routes/news_feed';

export const navLinks = [
    { id: 'news_feed', href: newsFeed.index.url(), icon: House },
    {
        id: 'list_of_movies',
        href: movies.index.url(),
        icon: Clapperboard,
    },
] as const;
