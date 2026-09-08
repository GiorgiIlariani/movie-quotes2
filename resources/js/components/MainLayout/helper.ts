import { Clapperboard, House } from 'lucide-react';

import movies from '@/wayfinder/routes/movies';

export const navLinks = [
    { id: 'news_feed', href: '#', icon: House },
    {
        id: 'list_of_movies',
        href: movies.index.url(),
        icon: Clapperboard,
    },
] as const;
