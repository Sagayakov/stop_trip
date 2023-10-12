import { Route, Routes } from 'react-router-dom';
import { Layout } from '../layout';
import { privateRoutes, publicRoutes } from './routes';

export const AppRouter = () => {
    const isAuth = false; //change after synchronization with backend

    const routes = isAuth ? privateRoutes : publicRoutes;

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {routes.map(({ path, component: Component }) => {
                    return (
                        <Route
                            path={`/${path}`}
                            element={<Component />}
                            key={path}
                        />
                    );
                })}
            </Route>
        </Routes>
    );
};
