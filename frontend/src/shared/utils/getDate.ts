import { useAppSelector } from '../../app/store/hooks';

export const GetDate = (publicDate: string) => {
    const lang = useAppSelector((state) => state.setLang.lang);

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
            dayToDisplay = lang === 'ru' ? 'Сегодня' : 'Today';
        }
        if (todayDay - day === 1) {
            dayToDisplay = lang === 'ru' ? 'Вчера' : 'Yesterday';
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
