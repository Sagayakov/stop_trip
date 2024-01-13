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
            'features/addAnnouncementForm/universalFields/annPhoto/AnnouncementPhotoField.tsx'
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
export const AnnouncementRegion = lazy(
    () => import('features/addAnnouncementForm/universalFields/AnnouncementRegion.tsx')
)
export const AnnouncementCity = lazy(
    () => import('features/addAnnouncementForm/universalFields/AnnouncementCity.tsx')
)
export const AnnouncementCountry = lazy(
    () => import('features/addAnnouncementForm/universalFields/AnnouncementCountry.tsx')
)