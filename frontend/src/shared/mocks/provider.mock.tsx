import userEvent from '@testing-library/user-event';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { publicRoutes } from 'app/router/routes';
import { render } from '@testing-library/react';

export const runMockProvider = async (route: string, description: string) => {
    window.history.pushState({}, `${description} page`, route);
    return {
        user: userEvent.setup(),
        ...render(
            <RouterProvider router={createBrowserRouter(publicRoutes)} />
        ),
    };
};
