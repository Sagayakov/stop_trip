export interface LastAdvertsTypes {
    count: number;
    next: string | null;
    previous: string | null;
    results: AdvertsTypes[];
}

export interface AdvertsTypes {
    id: number;
    category: string;
    country: {
        name: string | null;
    };
    region: {
        name: string | null;
    };
    city: {
        name: string | null;
    };
    title: string;
    price: number;
    description?: string;
    images: LastAdvertsImages[];
    date_create: string;
    owner: Owner;
    slug: string;
    exchange_rate: number | null;
    proposed_currency?: string | null;
    exchange_for?: string | null;
}

export interface LastAdvertsImages {
    id: number;
    image: string;
}

export type Owner = {
    date_joined: string;
    email: string;
    full_name: string;
    id: number;
    phone: string;
};
