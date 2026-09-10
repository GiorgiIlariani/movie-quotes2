export type HeaderTranslations = {
    brand: string;
    log_out: string;
    notifications: string;
    language: string;
    search: string;
    open_navigation: string;
    navigation: string;
    sign_up: string;
    log_in: string;
};

export type NavTranslations = {
    guest: string;
    edit_profile: string;
    news_feed: string;
    list_of_movies: string;
};

export type LocaleTranslations = {
    en: string;
    ka: string;
};

export type QuoteTranslations = {
    add_quote: string;
    new_quote: string;
    new_quote_description: string;
    quote_en_placeholder: string;
    quote_ka_placeholder: string;
    drag_image: string;
    choose_file: string;
    change_photo: string;
    select_movie: string;
};

export type MovieTranslations = {
    my_list: string;
    total: string;
    add_movie: string;
    add_movie_title: string;
    add_movie_description: string;
    quotes_count: string;
    user_profile: string;
    title_en: string;
    title_ka: string;
    release_year: string;
    director_en: string;
    director_ka: string;
    description_en: string;
    description_ka: string;
};

export type Translations = {
    header: HeaderTranslations;
    nav: NavTranslations;
    locale: LocaleTranslations;
    movies: MovieTranslations;
    quotes: QuoteTranslations;
};
