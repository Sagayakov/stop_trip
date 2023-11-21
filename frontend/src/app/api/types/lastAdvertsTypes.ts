export interface LastAdvertsTypes {
    id: number;
    category?: string;
    title: string;
    price: number;
    description?: string;
    images: LastAdvertsImages[];
    date_create: string
}

export interface LastAdvertsImages {
    image: string;
}
