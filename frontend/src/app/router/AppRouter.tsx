import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '../layout';
import { privateRoutes, publicRoutes } from './routes';
import { useAppSelector } from '../store/hooks';
import { ActivateAccount } from '../../pages/activateAccount/ActivateAccount';

export const AppRouter = () => {
    /* const localStorageIsAuth = 'true' === localStorage.getItem('rememberMe') ? true : false; */
    //Изначально в редаксе isAuth="false". Если мы находились в приватном роутинге (и этой страницы не было в публичном), то при перезагрузке страницы перебрасывает на 404
    const isAuth = useAppSelector((state) => state.setIsAuth.isAuth);
    const routes = (/* localStorageIsAuth || */ isAuth) ? privateRoutes : publicRoutes;

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {routes
                    .filter((el) => el.component !== ActivateAccount)
                    .map(({ path, component: Component }) => {
                    return (
                        <Route
                            path={`/${path}/`}
                            element={<Component />}
                            key={path}
                        />
                    );
                })}
            </Route>
            <Route path="/">
                {routes
                    .filter((el) => el.component === ActivateAccount)
                    .map(({ path, component: Component }) => {
                    return (
                        <Route
                            path={`/${path}`}
                            element={<Component />}
                            key={path}
                        />
                    );
                })}
            </Route>
            <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
    );
};
