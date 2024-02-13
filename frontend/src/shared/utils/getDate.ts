export const getDate = (publicDate: string | undefined) => {
    if (publicDate) {
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

        let dayToDisplay: string = `${day < 10 ? `0${day}` : day}.${
            month < 9 ? `0${month + 1}` : month + 1
        }.${year}`;

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
            hours: `${hours}`,
            minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
        };
    } else {
        const dayToDisplay = '';
        const hours = '';
        const minutes = '';
        return { dayToDisplay, hours, minutes };
    }
};
