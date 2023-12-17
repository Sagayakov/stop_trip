export const getDate = (publicDate: string) => {
    const date = new Date(publicDate);
    const { day, month, year } = {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
    };

    const today = new Date();
    const { todayDay, todayMonth, todayYear } = {
        todayDay: today.getDate(),
        todayMonth: today.getMonth(),
        todayYear: today.getFullYear(),
    };

    let dayToDisplay: string = `${day}.${month + 1}.${year}`;

    if (month === todayMonth && year === todayYear) {
        if (day === todayDay) {
            dayToDisplay = 'Сегодня';
        }
        if (todayDay - day === 1) {
            dayToDisplay = 'Вчера';
        }
    }

    const hours = date.getHours();
    const minutes = date.getMinutes();

    return {
        dayToDisplay,
        hours,
        minutes: minutes < 10 ? `0${minutes}` : minutes,
    };
};
