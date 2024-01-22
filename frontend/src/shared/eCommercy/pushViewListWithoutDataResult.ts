import { MyAnnouncements } from 'app/api/types/myAnnouncements.ts';

interface Item {
    id: number;
    name: string;
    price: number;
    category: string;
    list: string;
    position: number;
}

export const pushViewListWithoutDataResult = (data:  MyAnnouncements[] | undefined, listDescription: string) => {
    if (data) {
        const impressions = data.reduce((acc: Item[], item: MyAnnouncements, index: number) => {
            acc.push({
                id: Number(item.id),
                name: item.title,
                price: Number(item.price),
                category: item.category!,
                list: listDescription,
                position: Number(index + 1),
            });
            return acc;
        }, []);
        window.dataLayer.push({//добавляем список просмотренных товаров
            ecommerce: {
                currencyCode: 'RUB',
                impressions: impressions,
            },
        });
    }
}