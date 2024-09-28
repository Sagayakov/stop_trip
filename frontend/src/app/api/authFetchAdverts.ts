import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { MyAnnouncements } from 'app/api/types/myAnnouncements.ts';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { ProductType } from 'pages/advertPage/libr/types.ts';
import { baseQueryWithReauth } from 'app/api/handlers/baseQueryWithReauth.ts';
import { getCsrfToken } from 'app/api/handlers/getCsrfToken.ts';

export const authFetchAdverts = createApi({
    reducerPath: 'authFetchAdverts',
    tagTypes: ['Adverts', 'MyAnnouncements'],
    baseQuery: baseQueryWithReauth,
    endpoints: (build) => ({
        addAdvert: build.mutation<ProductType, FormData>({
            query: (body) => ({
                url: 'api/advertisements/',
                method: 'POST',
                headers: {
                    'X-Csrftoken': getCsrfToken(),
                },
                body,
            }),
            invalidatesTags: ['Adverts'],
        }),
        myAnnouncements: build.query<MyAnnouncements[], string>({
            query: () => ({
                url: 'api/advertisements/my_advertisements/',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            providesTags: ['MyAnnouncements'],
        }),
        deleteAnnouncemet: build.mutation<null, string>({
            query: (slug) => ({
                url: `api/advertisements/${slug}`,
                method: 'DELETE',
            }),
        }),
        editAdvert: build.mutation<
            FormAddAnn,
            { body: FormAddAnn; addSlug: string }
        >({
            query: ({ body, addSlug }) => ({
                url: `api/advertisements/${addSlug}`,
                method: 'PUT',
                headers: {
                    'X-Csrftoken': getCsrfToken(),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            }),
            invalidatesTags: ['MyAnnouncements'],
        }),
        getAdvertBySlug: build.query<ProductType, string>({
            query: (slug) => ({
                url: `api/advertisements/${slug}/`,
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useAddAdvertMutation,
    useEditAdvertMutation,
    useMyAnnouncementsQuery,
    useDeleteAnnouncemetMutation,
    useGetAdvertBySlugQuery,
} = authFetchAdverts;
