export const getPrevLocation = () => {
    const prevLocation = sessionStorage.getItem('prevLocation');
    switch (prevLocation){
        case "category":
            return "Категория товаров"
        case "favorite":
            return "Избранные"
        default:
            return "Последние объявления"
    }
}