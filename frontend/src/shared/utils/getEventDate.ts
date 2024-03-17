export const getEventDate = (date: string) => {
    const strDate = new Date(date);
    const { day, month, year } = {
        day: strDate.getDate(),
        month: strDate.getMonth(),
        year: strDate.getFullYear(),
    };

    const dayToDisplay: string = `${day.toString().padStart(2, '0')}.${(
        month + 1
    )
        .toString()
        .padStart(2, '0')}.${year}`;

    const hours = strDate.getHours();
    const minutes = strDate.getMinutes();

    return {
        time: `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}`,
        day: `${dayToDisplay}`,
    };
};
