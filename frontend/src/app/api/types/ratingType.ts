export type RatingType = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Rating[];
};

export type Rating = {
    from_user: number;
    rating: number;
    comment: string;
    date_created: string;
};
