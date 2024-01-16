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
import userEvent from '@testing-library/user-event';
import { AppRouter } from 'app/router/AppRouter';
import { useTranslation } from 'react-i18next';

beforeEach((): void => {
    fetchMock.resetMocks();
});

jest.mock('react-i18next', () => ({
    useTranslation: jest.fn(),
}));

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

        const enLangBtn = screen.getByTestId('test-english');
        userEvent.click(enLangBtn);

        waitFor(() => {
            const popularCategoriesHeader =
                screen.getByText(/popular categories/i);
            expect(popularCategoriesHeader).toBeInTheDocument();
        });
    });
});
