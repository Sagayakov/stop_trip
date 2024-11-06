import { UserMessenger } from "pages/advertPage/libr/types";

export interface LastAdvertsTypes {
    count: number;
    next: string | null;
    previous: string | null;
    results: AdvertsTypes[];
}

export interface AdvertsTypes {
    id: number;
    category: string;
    country: NameType | null;
    region: NameType | null;
    city: NameType | null;
    title: string;
    price: number;
    description?: string;
    images: LastAdvertsImages[];
    date_create: string;
    owner: Owner;
    slug: string;
    exchange_rate: string | null;
    proposed_currency?: string | null;
    exchange_for?: string | null;
}

export type NameType = {
    name: string;
    slug: string;
};

export interface LastAdvertsImages {
    id: number;
    image: string;
    size: string;
}

export type Owner = {
    date_joined: string;
    email: string;
    full_name: string;
    id: number;
    phone: string;
    avg_rating: number;
    my_rating: number;
    rating_num: number;
    user_messengers: UserMessenger[];
};

export type AvailableValuesType = {
    name: string;
    slug: string;
};
