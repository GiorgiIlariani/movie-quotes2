import type { MovieOption, TranslatedText } from './movie';

export type QuoteAuthor = {
    id: number;
    name: string;
    avatar?: string;
};

export type QuoteComment = {
    id: number;
    comment: string;
    quote_id: number;
    user?: QuoteAuthor;
};

export type Quote = {
    id: number;
    quote: TranslatedText;
    cover: string | null;
    movie_id: number;
    user_id: number;
    movie?: MovieOption;
    user?: QuoteAuthor;
    likes_count?: number;
    comments_count?: number;
    liked?: boolean;
    comments?: QuoteComment[];
};
