import { ComponentType } from 'react';
import { MainPage } from '../../pages/main/MainPage';
import { categories } from '../../shared/const/categories';
import { CategoryPage } from '../../pages/category/CategoryPage';
import { AddAdvertPage } from '../../pages/add-advert/AddAdvertPage';
import { ActivateAccount } from '../../pages/activateAccount/ActivateAccount';
import { ResetPassword } from '../../pages/resetPassword/ResetPassword';
import { AdvertPage } from '../../pages/advertPage/AdvertPage';

interface Route {
    path: string;
    component: ComponentType;
}

const categoryRoutes = Object.keys(categories).map((el) => ({
    path: `/${el}`,
    component: CategoryPage,
}));

export const publicRoutes: Route[] = [
    { path: '/', component: MainPage },
    { path: '/activate/:uid/:token', component: ActivateAccount },
    { path: '/email/reset/confirm/:uid/:token', component: ResetPassword },
    { path: '/api/advertisements/:id', component: AdvertPage },
    ...categoryRoutes,
];

export const privateRoutes: Route[] = [
    { path: '/', component: MainPage },
    { path: '/add-advert', component: AddAdvertPage },
    { path: '/api/advertisements/:id', component: AdvertPage },
    ...categoryRoutes,
];
