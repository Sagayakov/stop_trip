import { GetDateOfCreating } from 'entity/lastAdverts/libr/getDateOfCreating.ts';
import * as hooks from 'app/store/hooks.ts';
import mocked = jest.mocked;

jest.mock('app/store/hooks.ts');
const formatTime = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours < 10 ? '0' + hours : hours}:${
        minutes < 10 ? '0' + minutes : minutes
    }`;
};

describe('тестирование функции, возвращающей дату создания объявления', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Сегодня', () => {
        mocked(hooks.useAppSelector).mockReturnValueOnce('ru');
        expect(GetDateOfCreating(new Date().toISOString())).toBe(
            `Сегодня, ${formatTime()}`
        );
    });

    test('Today', () => {
        mocked(hooks.useAppSelector).mockReturnValueOnce('en');
        expect(GetDateOfCreating(new Date().toISOString())).toBe(
            `Today, ${formatTime()}`
        );
    });

    test('Вчера', () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        yesterday.setHours(12, 0, 0, 0);

        mocked(hooks.useAppSelector).mockReturnValueOnce('ru');
        expect(GetDateOfCreating(yesterday.toISOString())).toBe('Вчера, 12:00');
    });

    test('Yesterday', () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        yesterday.setHours(12, 0, 0, 0);

        mocked(hooks.useAppSelector).mockReturnValueOnce('en');
        expect(GetDateOfCreating(yesterday.toISOString())).toBe('Yesterday, 12:00');
    });

    test('Позавчера', () => {
        const day = new Date();
        day.setDate(day.getDate() - 2);

        const formattedDate = `${day.getDate().toString().padStart(2, '0')}.${(
            day.getMonth() + 1).toString().padStart(2, '0')}.${day.getFullYear()}`;

        expect(GetDateOfCreating(day.toISOString())).toBe(formattedDate);
    });
});
