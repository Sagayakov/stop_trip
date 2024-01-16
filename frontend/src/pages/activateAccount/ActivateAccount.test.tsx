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

describe('Account activation route', () => {
    test('should render Activate account page', () => {
        ((route = `/activate/aaaaa/aaaaaaa`) => {
            window.history.pushState({}, 'Activate account page', route);
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
            const notFoundHeader = screen.getByText(/account activation/i);
            expect(notFoundHeader).toBeInTheDocument();
        });
    });
});
