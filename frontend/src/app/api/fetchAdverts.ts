import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    AvailableValuesType,
    LastAdvertsTypes,
} from './types/lastAdvertsTypes';
import { url } from 'shared/const/url.ts';
import { AvailableFiltersType, FiltersType } from './types/filtersType';
import { SelectOptionValues } from 'app/api/types/selectOptionValues.ts';

export const fetchAdverts = createApi({
    reducerPath: 'fetchAdverts',
    tagTypes: ['Adverts', 'MyAnnouncements'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${url}/`,
        credentials: 'include',
    }),
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
        getFilters: build.query<FiltersType, string>({
            query: () => `api/advertisements/get_filter_params/`,
        }),
        getSelectOptions: build.query<SelectOptionValues, string>({
            query: () => `api/advertisements/get_filter_params/`,
        }),
        getAvailableFilters: build.query<AvailableFiltersType, string>({
            query: (filterQuery = '') =>
                `api/advertisements/get_available_filtered_params/${filterQuery}`,
        }),
        getCitiesByRegion: build.query<AvailableValuesType[], string>({
            query: (filterQuery = '') =>
                `api/advertisements/get_cities_by_region/${filterQuery}`,
        }),
    }),
});

export const {
    useGetAdvertsQuery,
    useGetFiltersQuery,
    useGetSelectOptionsQuery,
    useGetAvailableFiltersQuery,
    useGetCitiesByRegionQuery,
} = fetchAdverts;
