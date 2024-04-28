import { ComponentType } from 'react';
import { categories } from 'shared/const/categories.tsx';
import {
    ActivateAccount,
    AddAnnouncementPage,
    AdvertPage,
    AdvertisementEditing,
    CategoryPage,
    FavoritesPage,
    MainPage,
    MyAnnouncements,
    PageNotFound,
    ResetPassword,
    MySettings,
    UserAgreement,
    UserPage,
} from './components';

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
    { path: '/:category/:slug', component: AdvertPage },
    { path: '/user-agreement', component: UserAgreement },
    { path: '/user/:id', component: UserPage },
    { path: '/404', component: PageNotFound },
    ...categoryRoutes,
];

export const privateRoutes: Route[] = [
    { path: '/', component: MainPage },
    { path: '/add-announcement', component: AddAnnouncementPage },
    { path: '/advertisement-editing/:slug', component: AdvertisementEditing },
    { path: '/:category/:slug', component: AdvertPage },
    { path: '/404', component: PageNotFound },
    { path: '/my-announcements', component: MyAnnouncements },
    { path: '/favorites', component: FavoritesPage },
    { path: '/my-settings', component: MySettings },
    { path: '/user-agreement', component: UserAgreement },
    { path: '/user/:id', component: UserPage },
    ...categoryRoutes,
];
