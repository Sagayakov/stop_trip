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

describe('Account activation route', () => {
    test('should render Activate account page', async () => {
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
                    <MemoryRouter initialEntries={['/activate/aaaaa/aaaaaaa']}>
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            )
        );

        const activateHeader = screen.getByRole('heading', {
            name: /activate-page.activation/i,
        });
        expect(activateHeader).toBeInTheDocument();
    });
});
