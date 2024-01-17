/**
 * @jest-environment jsdom
 */
import fetchMock from 'jest-fetch-mock';
import 'shared/mocks/matchMedia.mock';
import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import { localStorageMock } from 'shared/mocks/localStorage.mock';
import { Provider } from 'react-redux';
import { store } from 'app/store/store';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from 'app/router/AppRouter';
import { useTranslation } from 'react-i18next';
import userEvent from '@testing-library/user-event';

beforeEach((): void => {
    fetchMock.resetMocks();
});

localStorageMock().setItemMock('lang', 'en');

jest.mock('react-i18next', () => ({
    useTranslation: jest.fn(),
}));

describe('Favorites route', () => {
    test('should render Favorites page', async () => {
        const useTranslationSpy = useTranslation;
        const tSpy = jest.fn((str) => str);
        (useTranslationSpy as jest.Mock).mockReturnValue({
            t: tSpy,
            i18n: {
                changeLanguage: () => new Promise(() => {}),
            },
        });

        fetchMock.mockResolvedValue({
            status: 200,
        } as Response);
        store.dispatch = jest.fn();

        await act(() =>
            render(
                <Provider store={store}>
                    <MemoryRouter>
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            )
        );

        const authBtn = screen.getByText(/main-page.login-register/i);
        await act(() => userEvent.click(authBtn));
        const loginModal = screen.getByText(/modal-login.login/i);
        await act(() => userEvent.click(loginModal));
        const nameInput = screen.getByPlaceholderText(/email/i);
        await act(() => userEvent.type(nameInput, 'androbailoe@gmail.com'));
        const passwordInput = screen.getByPlaceholderText(/password/i);
        await act(() => userEvent.type(passwordInput, 'Aaaaa_111'));
        const loginBtn = screen.getByTestId('enter-button');
        await act(() => userEvent.click(loginBtn));

        const favsLink = screen.getByText(/modal-logged.favorites/i);
        await act(() => userEvent.click(favsLink));

        const favoritesHeader = screen.getByRole('heading', {
            name: /favorites/i,
        });
        expect(favoritesHeader).toBeInTheDocument();
    });
});
