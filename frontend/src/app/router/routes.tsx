import { ComponentType, lazy } from 'react';
import { categories } from 'shared/const/categories.tsx';
export const AddAnnouncementPage = lazy(() => import('pages/addAnnouncement/AddAnnouncementPage.tsx'));
export const ActivateAccount = lazy(() => import('pages/activateAccount/ActivateAccount.tsx'));
export const AdvertPage = lazy(() => import('pages/advertPage/AdvertPage.tsx'));
export const CategoryPage = lazy(() => import('pages/categoryPage/CategoryPage.tsx'));
export const MainPage = lazy(() => import('pages/mainPage/MainPage.tsx'));
export const MyAnnouncements = lazy(() => import('pages/myAnnouncements/MyAnnouncements.tsx'));
export const PageNotFound = lazy(() => import('pages/notFound/PageNotFound.tsx'));
export const ResetPassword = lazy(() => import('pages/resetPassword/ResetPassword.tsx'));


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
