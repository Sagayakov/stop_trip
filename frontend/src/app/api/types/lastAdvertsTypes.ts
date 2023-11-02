export interface LastAdvertsTypes {
    id: number;
    category?: string;
    title: string;
    price: number;
    description?: string;
    images: LastAdvertsImages[];
}

interface LastAdvertsImages {
    image: string;
}
