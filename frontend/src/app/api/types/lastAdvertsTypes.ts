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
}

export interface LastAdvertsImages {
    image: string;
}

export type Owner = {
    date_joined: string;
    email: string;
    full_name: string;
    id: number;
    phone: string;
};
