export interface MyAnnouncements {
    id?: number;
    category?: string;
    title: string;
    price: number;
    images: Images[] | [];
    date_create: string;
    owner?: Owner;
    slug: string | null;
}
export interface Owner {
    id: number;
    full_name: string;
    phone: string;
    email: string;
    date_joined: string;
}
interface Images {
    image: string;
}
