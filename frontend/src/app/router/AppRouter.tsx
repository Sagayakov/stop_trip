import { Route, Routes } from 'react-router-dom';
import { Layout } from '../layout';
import { privateRoutes, publicRoutes } from './routes';
import { useAppSelector } from '../store/hooks';

export const AppRouter = () => {
    const isAuth = useAppSelector((state) => state.setIsAuth.isAuth);

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
