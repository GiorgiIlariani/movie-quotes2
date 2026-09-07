export type MovieCategory = {
    id: number;
    category_title: string;
};

export type Movie = {
    id: number;
    title_en: string;
    title_ka: string;
    director_en: string | null;
    director_ka: string | null;
    description_en: string;
    description_ka: string;
    release_year: number;
    cover: string;
    categories: MovieCategory[];
};
