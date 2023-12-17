import { ComponentType } from 'react';
import { MainPage } from 'pages/main/MainPage.tsx';
import { categories } from 'shared/const/categories.tsx';
import { CategoryPage } from 'pages/category/CategoryPage.tsx';
import { ActivateAccount } from 'pages/activateAccount/ActivateAccount.tsx';
import { ResetPassword } from 'pages/resetPassword/ResetPassword.tsx';
import { AdvertPage } from 'pages/advertPage/AdvertPage.tsx';
import { AddAnnouncementPage } from 'pages/addAnnouncement/AddAnnouncementPage.tsx'
import { PageNotFound } from 'pages/notFound/PageNotFound.tsx';
import { MyAnnouncements } from 'pages/myAnnouncements/MyAnnouncements.tsx';

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
    ...categoryRoutes,
];

export const privateRoutes: Route[] = [
    { path: '/', component: MainPage },
    { path: '/add-announcement', component: AddAnnouncementPage },
    { path: '/:category/:id', component: AdvertPage },
    { path: '/404', component: PageNotFound },
    { path: '/my-announcements', component: MyAnnouncements },
    ...categoryRoutes,
];
