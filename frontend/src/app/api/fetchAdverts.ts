import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LastAdvertsTypes } from './types/lastAdvertsTypes';
import { url } from 'shared/const/url.ts';
import { ProductType } from 'pages/advertPage/libr/types.ts';
import { FiltersType } from './types/filtersType';
import { MyAnnouncements } from 'app/api/types/myAnnouncements.ts';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';

export const fetchAdverts = createApi({
    reducerPath: 'fetchAdverts',
    tagTypes: ['Adverts', 'MyAnnouncements'],
    baseQuery: fetchBaseQuery({ baseUrl: `${url}/` }),
    endpoints: (build) => ({
        getAdverts: build.query<LastAdvertsTypes, string>({
            //дженериками передаем тип того что собираемся получить, а второй тип это то что передаем в качестве параметра при вызове хука, в данном случае пустая строка
            query: (filterQuery = '') =>
                `api/advertisements/${filterQuery.replace(/%2C/g, ',')}`, //заменяет код запятой из строки
            providesTags: (result) =>
                result // понадобится когда можно будет добавлять объявления
                    ? [
                          ...result.results.map(({ id }) => ({
                              type: 'Adverts' as const,
                              id,
                          })),
                          { type: 'Adverts', id: 'LIST' },
                      ]
                    : [{ type: 'Adverts', id: 'LIST' }],
        }),
        addAdvert: build.mutation<
            ProductType,
            { body: FormAddAnn; token: string }
        >({
            query: ({ body, token }) => ({
                url: 'api/advertisements/', // сюда вписать адрес для добавления нового объявления
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body,
            }),
            invalidatesTags: ['Adverts'],
        }),
        getAdvertBySlug: build.query<ProductType, string>({
            query: (slug) => `api/advertisements/${slug}/`,
        }),
        getFilters: build.query<FiltersType, string>({
            query: () => `api/advertisements/get_filter_params/`,
        }),
        myAnnouncements: build.query<MyAnnouncements[], string>({
            query: (token: string) => ({
                url: 'api/advertisements/my_advertisements/',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }),
            providesTags: ['MyAnnouncements'],
        }),
        editAdvert: build.mutation<
            FormAddAnn,
            { body: FormAddAnn; addId: number; accessToken: string }
        >({
            query: ({ body, addId, accessToken }) => ({
                url: `api/advertisements/${addId}`,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body,
            }),
            invalidatesTags: ['MyAnnouncements'],
        }),
    }),
});

export const {
    useGetAdvertsQuery,
    useGetAdvertBySlugQuery,
    useGetFiltersQuery,
    useAddAdvertMutation,
    useMyAnnouncementsQuery,
    useEditAdvertMutation,
} = fetchAdverts;
