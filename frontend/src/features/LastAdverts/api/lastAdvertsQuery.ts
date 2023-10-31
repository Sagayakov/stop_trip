import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { url } from '../../../shared/const/url'
import { LastAdvertsTypes } from '../libr/lastAdvertsTypes';

export const lastAdvertsQuery = createApi({
    reducerPath: 'lastAdverts',
    tagTypes: ['lastAdverts'],
    baseQuery: fetchBaseQuery({ baseUrl: `${url}/` }),
    endpoints: (build) => ({
        getLastAdverts: build.query<LastAdvertsTypes[], string>({
            //дженериками передаем тип того что собираемся получить, а второй тип это то что передаем в качестве параметра при вызове хука, в данном случае пустая строка
            query: () => 'api/advertisements/',
            // providesTags: (result) =>
            //     result
            //         ? [
            //               ...result.map(({ id }) => ({
            //                   type: 'lastAdverts' as const,
            //                   id,
            //               })),
            //               { type: 'lastAdverts', id: 'LIST' },
            //           ]
            //         : [{ type: 'lastAdverts', id: 'LIST' }],
            //понадобится когда можно будет добавлять объявления
        }),
    }),
});

export const { useGetLastAdvertsQuery } = lastAdvertsQuery