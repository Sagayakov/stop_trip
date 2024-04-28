import { ProductType } from 'pages/advertPage/libr/types';
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    QueryDefinition,
} from '@reduxjs/toolkit/dist/query';
import { QueryActionCreatorResult } from '@reduxjs/toolkit/dist/query/core/buildInitiate';
import { LastAdvertsTypes } from 'app/api/types/lastAdvertsTypes';

export type RatingProps = {
    id: number;
    rating: number;
    myRating: number;
    refetch: () => QueryActionCreatorResult<
        QueryDefinition<
            string,
            BaseQueryFn<
                string | FetchArgs,
                unknown,
                FetchBaseQueryError,
                Record<string, never>,
                FetchBaseQueryMeta
            >,
            'Adverts' | 'MyAnnouncements',
            ProductType,
            'authFetchAdverts'
        >
    > | QueryActionCreatorResult<
        QueryDefinition<
            string,
            BaseQueryFn<
                string | FetchArgs,
                unknown,
                FetchBaseQueryError,
                Record<string, never>,
                FetchBaseQueryMeta
            >,
            "Adverts" | "MyAnnouncements",
            LastAdvertsTypes,
            "fetchAdverts"
        >
    >;
};