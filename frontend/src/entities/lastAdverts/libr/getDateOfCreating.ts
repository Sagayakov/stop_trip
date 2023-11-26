export const getDateOfCreating = (str: string) => {
    let day: string | number = new Date(str).getDate();
    let month: string | number = new Date(str).getMonth();
    const year = new Date(str).getFullYear();
    // eslint-disable-next-line prefer-const
    let hours = new Date(str).getHours();
    // eslint-disable-next-line prefer-const
    let minutes = new Date(str).getMinutes();
    const dateCreate = new Date(year, month, day);
    const currentDate = new Date();
    const diffTime = Math.abs(Number(currentDate) - Number(dateCreate));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24) - 1);

    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;
    if (hours < 10) month = '0' + hours;
    if (minutes < 10) month = '0' + minutes;

    switch (diffDays) {
        case 0:
            return `Cегодня, ${hours}:${minutes}`;
        case 1:
            return `Вчера, ${hours}:${minutes}`;
        default:
            return `${day}.${Number(month) + 1}.${year}`;
    }
};
