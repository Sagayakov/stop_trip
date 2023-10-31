import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { url } from '../../../shared/const/url'
import { LastAdvertsTypes } from '../libr/lastAdvertsTypes';

export const lastAdvertsQuery = createApi({
    reducerPath: 'lastAdverts',
    baseQuery: fetchBaseQuery({ baseUrl: `${url}/` }),
    endpoints: (build) => ({
        getLastAdverts: build.query<LastAdvertsTypes[], string>({
            //дженериками передаем тип того что собираемся получить, а второй тип это то что передаем в качестве параметра при вызове хука, в данном случае пустая строка
            query: () => 'api/advertisements/',
        }),
    }),
});

export const { useGetLastAdvertsQuery } = lastAdvertsQuery