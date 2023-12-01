import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LastAdvertsTypes } from './types/lastAdvertsTypes';
import { url } from '../../shared/const/url';
import { ProductType } from '../../pages/advertPage/libr/types';

export const fetchAdverts = createApi({
    reducerPath: 'fetchAdverts',
    tagTypes: ['Adverts'],
    baseQuery: fetchBaseQuery({ baseUrl: `${url}/` }),
    endpoints: (build) => ({
        getAdverts: build.query<LastAdvertsTypes[], string>({
            //дженериками передаем тип того что собираемся получить, а второй тип это то что передаем в качестве параметра при вызове хука, в данном случае пустая строка
            query: (filterQuery = '') => `api/advertisements/${filterQuery.replace(/%2C/g, '.')}`, //заменяет код запятой из строки
            providesTags: (result) =>
                result // понадобится когда можно будет добавлять объявления
                    ? [
                          ...result.map(({ id }) => ({
                              type: 'Adverts' as const,
                              id,
                          })),
                          { type: 'Adverts', id: 'LIST' },
                      ]
                    : [{ type: 'Adverts', id: 'LIST' }],
        }),
        addAdvert: build.mutation<LastAdvertsTypes[], LastAdvertsTypes>({
            query: (body) => ({
                url: 'api/advertisements/', // сюда вписать адрес для добавления нового объявления
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Adverts'],
        }),
        getAdvertById: build.query<ProductType, string>({
            query: (id) => `api/advertisements/${id}/`,
        }),
    }),
});

export const { useGetAdvertsQuery, useGetAdvertByIdQuery } = fetchAdverts;
