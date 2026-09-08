export type MovieCategory = {
    id: number;
    category_title: string;
};

export type Movie = {
    id: number;
    title: string;
    director: string;
    description: string;
    release_year: number;
    cover: string;
    categories: MovieCategory[];
};
