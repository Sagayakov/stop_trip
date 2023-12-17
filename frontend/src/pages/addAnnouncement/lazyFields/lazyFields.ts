import { lazy } from 'react';

export const AnnouncementCategoryField = lazy(
    () =>
        import(
            'features/addAnnouncementForm/universalFields/AnnouncementCategoryField'
        )
);
export const AnnouncementNameField = lazy(
    () =>
        import(
            'features/addAnnouncementForm/universalFields/AnnouncementNameFiled'
        )
);
export const AnnouncementPriceField = lazy(
    () =>
        import(
            'features/addAnnouncementForm/universalFields/AnnouncementPriceField'
        )
);
export const AnnouncementDescriptionField = lazy(
    () =>
        import(
            'features/addAnnouncementForm/universalFields/AnnouncementDescriptionField'
        )
);
export const AnnouncementPhotoField = lazy(
    () =>
        import(
            'features/addAnnouncementForm/universalFields/AnnouncementPhotoField'
        )
);
export const AnnouncementLocationField = lazy(
    () =>
        import(
            'features/addAnnouncementForm/universalFields/AnnouncementLocationField'
        )
);
export const OptionalFields = lazy(
    () => import('widgets/addAnnouncement/OptionalFields')
);
