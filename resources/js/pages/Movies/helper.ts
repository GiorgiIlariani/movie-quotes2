import type { MovieTranslations } from '@/types/translations';

export type MovieFormFieldId = Extract<
    keyof MovieTranslations,
    | 'title_en'
    | 'title_ka'
    | 'release_year'
    | 'director_en'
    | 'director_ka'
    | 'description_en'
    | 'description_ka'
>;

export const movieFormFields: {
    id: MovieFormFieldId;
    lang?: string;
    type?: 'number' | 'textarea';
}[] = [
    { id: 'title_en', lang: 'Eng' },
    { id: 'title_ka', lang: 'ქარ' },
    { id: 'release_year', type: 'number' },
    { id: 'director_en', lang: 'Eng' },
    { id: 'director_ka', lang: 'ქარ' },
    { id: 'description_en', lang: 'Eng', type: 'textarea' },
    { id: 'description_ka', lang: 'ქარ', type: 'textarea' },
];
