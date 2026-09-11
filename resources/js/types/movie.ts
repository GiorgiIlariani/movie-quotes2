import type { Quote } from './quote';

export type MovieCategory = {
    id: number;
    category_title: string;
};

export type TranslatedText = {
    en: string;
    ka: string;
};

export type Movie = {
    id: number;
    title: TranslatedText;
    director: TranslatedText;
    description: TranslatedText;
    release_year: number;
    cover: string;
    categories: MovieCategory[];
    quotes?: Quote[];
};

export type MovieOption = {
    id: number;
    title: TranslatedText;
    release_year: number;
};
