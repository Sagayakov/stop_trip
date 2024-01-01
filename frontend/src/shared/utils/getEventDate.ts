export const getEventDate = (date: string) => {
    const strDate = new Date(date);
    const { day, month, year } = {
        day: strDate.getDate(),
        month: strDate.getMonth(),
        year: strDate.getFullYear(),
    };

    const dayToDisplay: string = `${day}.${month + 1}.${year}`;

    const hours = strDate.getHours();
    const minutes = strDate.getMinutes();

    return {
        time: `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`,
        day: `${dayToDisplay}`,
    };
};
