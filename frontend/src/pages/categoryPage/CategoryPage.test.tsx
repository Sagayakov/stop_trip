/**
 * @jest-environment jsdom
 */
import fetchMock from 'jest-fetch-mock';
import 'shared/mocks/matchMedia.mock';
import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { categories } from 'shared/const/categories';
import { localStorageMock } from 'shared/mocks/localStorage.mock';
import { useTranslation } from 'react-i18next';
import { Provider } from 'react-redux';
import { store } from 'app/store/store';
import { AppRouter } from 'app/router/AppRouter';

beforeEach((): void => {
    fetchMock.resetMocks();
});

localStorageMock().setItemMock('lang', 'ru');

const testCases = Object.entries(categories).map((el) => ({
    category: el[0],
    expected: `categories.${el[0]}`,
}));

jest.mock('react-i18next', () => ({
    useTranslation: jest.fn(),
}));

describe('Category route', () => {
    test.each(testCases)(
        'should render category page for each category from test table',
        async ({ category }) => {
            const useTranslationSpy = useTranslation;
            const tSpy = jest.fn((str) => str);
            (useTranslationSpy as jest.Mock).mockReturnValue({
                t: tSpy,
                i18n: {
                    changeLanguage: () => new Promise(() => {}),
                },
            });

            await act(() =>
                render(
                    <Provider store={store}>
                        <MemoryRouter
                            initialEntries={[
                                `/${category}/?category=${category}&page=1`,
                            ]}
                        >
                            <AppRouter />
                        </MemoryRouter>
                    </Provider>
                )
            );

            const categoryHeader = screen.getByRole('heading', {
                name: /categories./i,
            });
            expect(categoryHeader).toBeInTheDocument();
        }
    );
});
