import { Clapperboard, House } from 'lucide-react';
import movies from '@/wayfinder/routes/movies';

export const navLinks = [
    { id: 'news', label: 'News feed', href: '#', icon: House },
    {
        id: 'movies',
        label: 'List of movies',
        href: movies.index.url(),
        icon: Clapperboard,
    },
];
