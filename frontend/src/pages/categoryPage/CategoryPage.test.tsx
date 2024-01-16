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
import { categories } from 'shared/const/categories';
import { localStorageMock } from 'shared/mocks/localStorage.mock';

beforeEach((): void => {
    fetchMock.resetMocks();
});

localStorageMock().setItemMock('lang', 'ru');

const testCases = Object.entries(categories).map((el) => ({
    category: el[0],
    expected: el[1].description,
}));

describe('Category route', () => {
    test.each(testCases)(
        'should render category page for each category from test table',
        ({ category, expected }) => {
            ((route = `/${category}/?category=${category}&page=1`) => {
                window.history.pushState({}, 'Category page', route);
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
                const categoryHeader = screen.getByRole('h1');
                expect(categoryHeader).toHaveTextContent(expected);
            });
        }
    );
});
