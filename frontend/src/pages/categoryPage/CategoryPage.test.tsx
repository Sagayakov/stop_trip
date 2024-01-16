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
import { categories } from 'shared/const/categories';

beforeEach((): void => {
    fetchMock.resetMocks();
});

jest.mock('react-i18next', () => ({
    useTranslation: jest.fn(),
}));

const testCases = Object.entries(categories).map((el) => ({
    category: el[0],
    expected: el[1].description,
}));

describe('Category route', () => {
    test.each(testCases)(
        'should render category page',
        ({ category, expected }) => {
            const useTranslationSpy = useTranslation;
            const tSpy = jest.fn((str) => str);
            (useTranslationSpy as jest.Mock).mockReturnValue({
                t: tSpy,
                i18n: {
                    changeLanguage: () => new Promise(() => {}),
                },
            });

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
                const ruLangBtn = screen.getByTestId('test-russian');
                userEvent.click(ruLangBtn);
                const categoryHeader = screen.getByRole('h1');
                expect(categoryHeader).toHaveTextContent(expected);
            });
        }
    );
});
