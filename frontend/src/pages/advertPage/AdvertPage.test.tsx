/**
 * @jest-environment jsdom
 */
import fetchMock from 'jest-fetch-mock';
import 'shared/mocks/matchMedia.mock';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { publicRoutes } from 'app/router/routes';
import { url } from 'shared/const/url';
import { categories } from 'shared/const/categories';

beforeEach((): void => {
    fetchMock.resetMocks();
});

const testCases = Object.keys(categories).map((category) => ({ category }));

describe('Product route', () => {
    test.each(testCases)(
        'should render product page for each category from test table',
        async ({ category }) => {
            const { results } = await (
                await fetch(
                    `${
                        url || 'https://stoptrip.com'
                    }/api/advertisements/${category}/?category=${category}&page=1`
                )
            ).json();

            if (results) {
                const { slug, title } = results[0];

                ((route = `/${category}/${slug}`) => {
                    window.history.pushState({}, 'Product page', route);
                    return {
                        user: userEvent.setup(),
                        ...render(
                            <RouterProvider
                                router={createBrowserRouter(publicRoutes)}
                            />
                        ),
                    };
                })();

                const productHeader = screen.getByRole('h1');
                expect(productHeader).toHaveTextContent(title);
            }
        }
    );
});
