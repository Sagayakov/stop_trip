import { QueryActionCreatorResult } from "@reduxjs/toolkit/dist/query/core/buildInitiate";
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    QueryDefinition
} from "@reduxjs/toolkit/dist/query";
import { LastAdvertsTypes } from "app/api/types/lastAdvertsTypes";
import { Owner, ProductType } from "pages/advertPage/libr/types";

export type UserInfoProps = {
    user: Owner;
    className: string;
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
    handleNavigate?: () => void;
}