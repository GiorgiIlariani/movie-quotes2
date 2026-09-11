export type AppNotification = {
    id: string;
    kind: 'like' | 'comment';
    actor_name: string;
    quote_id: number;
    quote_cover: string | null;
    read_at: string | null;
    created_at: string | null;
};
