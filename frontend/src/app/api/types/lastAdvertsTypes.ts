// export interface LastAdvertsTypes {
//     id: number;
//     category?: string;
//     title: string;
//     price: number;
//     description?: string;
//     images: LastAdvertsImages[];
//     date_create: string;
//     owner: Owner;
// }
export interface LastAdvertsTypes {
    count: number;
    next: string;
    previous: unknown;
    results: AdvertsTypes[];
}
export interface AdvertsTypes {
    id: number;
    category?: string;
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
}
