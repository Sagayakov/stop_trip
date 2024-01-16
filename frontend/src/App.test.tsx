/**
 * @jest-environment jsdom
 */
import fetchMock from 'jest-fetch-mock';
import 'shared/mocks/matchMedia.mock';
import '@testing-library/jest-dom';
import { act, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'app/store/store';
import { AppRouter } from 'app/router/AppRouter';
import { useTranslation } from 'react-i18next';
import { localStorageMock } from 'shared/mocks/localStorage.mock';

beforeEach((): void => {
    fetchMock.resetMocks();
});

jest.mock('react-i18next', () => ({
    useTranslation: jest.fn(),
}));

localStorageMock().setItemMock('lang', 'en');

describe('App', () => {
    test('should render main page', () => {
        const useTranslationSpy = useTranslation;
        const tSpy = jest.fn((str) => str);
        (useTranslationSpy as jest.Mock).mockReturnValue({
            t: tSpy,
            i18n: {
                changeLanguage: () => new Promise(() => {}),
            },
        });

        act(() => {
            render(
                <Provider store={store}>
                    <MemoryRouter>
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            );
        });

        waitFor(() => {
            const popularCategoriesHeader =
                screen.getByText(/popular categories/i);
            expect(popularCategoriesHeader).toBeInTheDocument();
        });
    });
});
