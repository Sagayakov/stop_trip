interface Props{
    id: number;
    title: string;
    price: number;
    category: string;
    index: number;
    listDescription: string
}

export const pushRemoveFromFavourite = ({ id, index, title, category, price, listDescription }: Props) => {
    window.dataLayer.push({//добавляем данные об "удалении из избранного"
        "ecommerce": {
            "currencyCode": "RUB",
            "remove": {
                "products": [
                    {
                        "id": Number(id),
                        "name": title,
                        "price": Number(price),
                        "category": category,
                        "list": listDescription,
                        "position": Number(index + 1),
                    }
                ]
            }
        }
    })
}