/**
 * @jest-environment jsdom
 */
import fetchMock from 'jest-fetch-mock';
import 'shared/mocks/matchMedia.mock';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'app/store/store';
import { AppRouter } from 'app/router/AppRouter';
import { useTranslation } from 'react-i18next';
import { act } from 'react-dom/test-utils';

beforeEach((): void => {
    fetchMock.resetMocks();
});

jest.mock('react-i18next', () => ({
    useTranslation: jest.fn(),
}));

describe('404 route', () => {
    test('should render Not found page', async () => {
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
                    <MemoryRouter initialEntries={['/non-existent-route']}>
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            )
        );

        const notFoundHeader = screen.getByRole('heading');
        expect(notFoundHeader).toHaveTextContent(/page-not-found/i);
        //expect(window.location.pathname).toEqual('/404');
    });
});
