/**
 * @jest-environment jsdom
 */
import fetchMock from 'jest-fetch-mock';
import 'shared/mocks/matchMedia.mock';
import '@testing-library/jest-dom';
import { screen, render, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'app/store/store';
import { AppRouter } from 'app/router/AppRouter';
import { useTranslation } from 'react-i18next';

beforeEach((): void => {
    fetchMock.resetMocks();
});

jest.mock('react-i18next', () => ({
    useTranslation: jest.fn(),
}));

describe('App', () => {
    test('should render main page', async () => {
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
                    <MemoryRouter>
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            )
        );

        const popularCategoriesHeader = screen.getByRole('heading', {
            name: /popular/i,
        });
        expect(popularCategoriesHeader).toBeInTheDocument();
    });
});
