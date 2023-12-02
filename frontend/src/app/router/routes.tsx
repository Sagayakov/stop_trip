import { ComponentType } from 'react';
import { MainPage } from '../../pages/main/MainPage';
import { categories } from '../../shared/const/categories';
import { CategoryPage } from '../../pages/category/CategoryPage';
import { ActivateAccount } from '../../pages/activateAccount/ActivateAccount';
import { ResetPassword } from '../../pages/resetPassword/ResetPassword';
import { AdvertPage } from '../../pages/advertPage/AdvertPage';
import { AddAnnouncementPage } from '../../pages/addAnnouncement/AddAnnouncementPage'
import { PageNotFound } from '../../pages/notFound/PageNotFound';

interface Route {
    path: string;
    component: ComponentType;
}

const categoryRoutes = Object.keys(categories).map((el) => ({
    path: `/${el}/`,
    component: CategoryPage,
}));

export const publicRoutes: Route[] = [
    { path: '/', component: MainPage },
    { path: '/activate/:uid/:token', component: ActivateAccount },
    { path: '/email/reset/confirm/:uid/:token', component: ResetPassword },
    { path: '/:category/:id', component: AdvertPage },
    { path: '/404', component: PageNotFound },
    { path: '/add-announcement', component: AddAnnouncementPage }, // убрать, когда при перезагрузке страницы не вылетит ошибка или не перебросит на 404
    ...categoryRoutes,
];

export const privateRoutes: Route[] = [
    { path: '/', component: MainPage },
    { path: '/add-announcement', component: AddAnnouncementPage },
    { path: '/:category/:id', component: AdvertPage },
    { path: '/404', component: PageNotFound },
    ...categoryRoutes,
];
