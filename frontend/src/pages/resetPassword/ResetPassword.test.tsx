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

describe('Reset password route', () => {
    test('should render Reset password page', () => {
        ((route = `/email/reset/confirm/aaaaa/aaaaaaa`) => {
            window.history.pushState({}, 'Reset password page', route);
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
            const notFoundHeader = screen.getByText(/update password/i);
            expect(notFoundHeader).toBeInTheDocument();
        });
    });
});
