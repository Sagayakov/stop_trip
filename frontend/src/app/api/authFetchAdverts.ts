import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { url } from 'shared/const/url.ts';
import { MyAnnouncements } from 'app/api/types/myAnnouncements.ts';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { ProductType } from 'pages/advertPage/libr/types.ts';
import { refetchAccessTokenForPrepareHeaders } from 'app/api/handlers/refetchAccessTokenForPrepareHeaders.ts';

export const authFetchAdverts = createApi({
    reducerPath: 'authFetchAdverts',
    tagTypes: ['Adverts', 'MyAnnouncements'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${url}/`,
        credentials: 'include',
        prepareHeaders: refetchAccessTokenForPrepareHeaders //перед обращением к эндпоинту обновляем accessToken
    }),
    endpoints: (build) => ({
        addAdvert: build.mutation<ProductType, FormAddAnn>({
            query: (body) => ({
                url: 'api/advertisements/',
                method: 'POST',
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
        editAdvert: build.mutation<FormAddAnn,{ body: FormAddAnn; addSlug: string }>({
            query: ({ body, addSlug }) => ({
                url: `api/advertisements/${addSlug}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['MyAnnouncements'],
        }),
        getAdvertBySlug: build.query<ProductType, string>({
            query: (slug) => ({
                url: `api/advertisements/${slug}/`,
                method: 'GET',
            }),
        }),
    })
});

export const {
    useAddAdvertMutation,
    useEditAdvertMutation,
    useMyAnnouncementsQuery,
    useDeleteAnnouncemetMutation,
    useGetAdvertBySlugQuery,
} = authFetchAdverts;