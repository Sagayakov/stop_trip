interface Props{
    id: number;
    title: string;
    price: number;
    category: string;
    index: number;
    listDescription: string;
}

export const pushAddToFavourite = ({ id, index, title, category, price, listDescription }: Props) => {
    window.dataLayer.push({//добавляем данные о "добавлении в избранное"
        "ecommerce": {
            "currencyCode": "RUB",
            "click": {
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