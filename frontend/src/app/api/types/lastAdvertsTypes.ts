export interface LastAdvertsTypes {
    id: number;
    category?: string;
    title: string;
    price: number;
    description?: string;
    images: LastAdvertsImages[];
}

export interface LastAdvertsImages {
    image: string;
}
