import type { TranslatedText } from './movie';

export type Quote = {
    id: number;
    quote: TranslatedText;
    cover: string | null;
    movie_id: number;
    user_id: number;
};
