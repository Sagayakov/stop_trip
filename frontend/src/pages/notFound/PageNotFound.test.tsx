/**
 * @jest-environment jsdom
 */
import fetchMock from 'jest-fetch-mock';
import 'shared/mocks/matchMedia.mock';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { useTranslation } from 'react-i18next';
import { publicRoutes } from 'app/router/routes';

beforeEach((): void => {
    fetchMock.resetMocks();
});

jest.mock('react-i18next', () => ({
    useTranslation: jest.fn(),
}));

describe('404 route', () => {
    test('should render Not found page', () => {
        const useTranslationSpy = useTranslation;
        const tSpy = jest.fn((str) => str);
        (useTranslationSpy as jest.Mock).mockReturnValue({
            t: tSpy,
            i18n: {
                changeLanguage: () => new Promise(() => {}),
            },
        });

        ((route = `/non-existent-route`) => {
            window.history.pushState({}, 'Not found page', route);
            return {
                user: userEvent.setup(),
                ...render(
                    <RouterProvider
                        router={createBrowserRouter(publicRoutes)}
                    />
                ),
            };
        })();

        waitFor(() => {
            const enLangBtn = screen.getByTestId('test-english');
            userEvent.click(enLangBtn);

            const notFoundHeader = screen.getByText(/there is no such page/i);
            expect(notFoundHeader).toBeInTheDocument();
            expect(window.location.pathname).toEqual('/404');
        });
    });
});
