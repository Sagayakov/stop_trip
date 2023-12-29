import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LastAdvertsTypes } from './types/lastAdvertsTypes';
import { url } from 'shared/const/url.ts';
import { ProductType } from 'pages/advertPage/libr/types.ts';
import { FiltersType } from './types/filtersType';
import { getTokensFromStorage } from 'widgets/header/libr/authentication/getTokensFromStorage.ts';
import { MyAnnouncements } from 'app/api/types/myAnnouncements.ts';

const { accessToken } = getTokensFromStorage();

export const fetchAdverts = createApi({
    reducerPath: 'fetchAdverts',
    tagTypes: ['Adverts'],
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
        addAdvert: build.mutation<ProductType, ProductType>({
            query: (body) => ({
                url: 'api/advertisements/', // сюда вписать адрес для добавления нового объявления
                method: 'POST',
                headers: {
                    'X-Csrftoken': `${accessToken}`,
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${accessToken}`,
                },
                body,
            }),
            invalidatesTags: ['Adverts'],
        }),
        getAdvertById: build.query<ProductType, string>({
            query: (id) => `api/advertisements/${id}/`,
        }),
        getFilters: build.query<FiltersType, string>({
            query: () => `api/advertisements/get_filter_params/`,
        }),
        myAnnouncements: build.query<MyAnnouncements[], string>({
            query: () => ({
                url: 'api/advertisements/my_advertisements/',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${accessToken}`,
                }
            })

        }),
    }),
});

export const { useGetAdvertsQuery, useGetAdvertByIdQuery, useGetFiltersQuery, useAddAdvertMutation, useMyAnnouncementsQuery } =
    fetchAdverts;

