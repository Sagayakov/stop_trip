/**
 * @jest-environment jsdom
 */
import fetchMock from 'jest-fetch-mock';
import 'shared/mocks/matchMedia.mock';
import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Provider } from 'react-redux';
import { store } from 'app/store/store';
import { AppRouter } from 'app/router/AppRouter';

beforeEach((): void => {
    fetchMock.resetMocks();
});

jest.mock('react-i18next', () => ({
    useTranslation: jest.fn(),
}));

describe('Reset password route', () => {
    test('should render Reset password page', async () => {
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
                        initialEntries={['/email/reset/confirm/aaaaa/aaaaaaa']}
                    >
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            )
        );

        const updateBtn = screen.getByRole('button', {
            name: /reset-page.update/i,
        });
        expect(updateBtn).toBeInTheDocument();
    });
});
