import { Clapperboard, House } from 'lucide-react';
import { movies } from '@/wayfinder/routes';

export const navLinks = [
    { id: 'news', label: 'News feed', href: '#', icon: House },
    {
        id: 'movies',
        label: 'List of movies',
        href: movies().url,
        icon: Clapperboard,
    },
];
