import { lazy } from 'react';

export const FavoritesPage = lazy(() => import('pages/favs/FavoritesPage.tsx'));
export const AddAnnouncementPage = lazy(
    () => import('pages/addAnnouncement/AddAnnouncementPage.tsx')
);
export const ActivateAccount = lazy(
    () => import('pages/activateAccount/ActivateAccount.tsx')
);
export const AdvertPage = lazy(() => import('pages/advertPage/AdvertPage.tsx'));
export const CategoryPage = lazy(
    () => import('pages/categoryPage/CategoryPage.tsx')
);
export const MainPage = lazy(() => import('pages/mainPage/MainPage.tsx'));
export const MyAnnouncements = lazy(
    () => import('pages/myAnnouncements/MyAnnouncements.tsx')
);
export const PageNotFound = lazy(
    () => import('pages/notFound/PageNotFound.tsx')
);
export const ResetPassword = lazy(
    () => import('pages/resetPassword/ResetPassword.tsx')
);
export const AdvertisementEditing = lazy(
    () => import('pages/advertisementEditing/AdvertisementEditing.tsx')
);
export const MySettings = lazy(() => import('pages/mySettings/MySettings.tsx'));
export const UserAgreement = lazy(
    () => import('pages/userAgreement/UserAgreement.tsx')
);
export const UserPage = lazy(() => import('pages/user/UserPage.tsx'))
