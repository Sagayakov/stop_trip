/**
 * @jest-environment jsdom
 */
import fetchMock from 'jest-fetch-mock';
import 'shared/mocks/matchMedia.mock';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { publicRoutes } from 'app/router/routes';
import { localStorageMock } from 'shared/mocks/localStorage.mock';

beforeEach((): void => {
    fetchMock.resetMocks();
});

localStorageMock().setItemMock('lang', 'en');

describe('404 route', () => {
    test('should render Not found page', () => {
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
            const notFoundHeader = screen.getByText(/there is no such page/i);
            expect(notFoundHeader).toBeInTheDocument();
            expect(window.location.pathname).toEqual('/404');
        });
    });
});
