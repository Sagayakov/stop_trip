import { Dispatch } from 'redux';
import { TFunction } from 'i18next';
import { QueryActionCreatorResult } from '@reduxjs/toolkit/dist/query/core/buildInitiate';
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    MutationDefinition,
    QueryDefinition,
} from '@reduxjs/toolkit/query';
import { MyAnnouncements } from 'app/api/types/myAnnouncements.ts';
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';

export interface TypesForHandlers {
    dispatch?: Dispatch;
    slug?: string;
    is_published?: boolean;
    t: TFunction<'translation', undefined>;
    refetch: () => QueryActionCreatorResult<
        QueryDefinition<
            string,
            BaseQueryFn<
                string | FetchArgs,
                unknown,
                FetchBaseQueryError,
                object,
                FetchBaseQueryMeta
            >,
            'Adverts' | 'MyAnnouncements',
            MyAnnouncements[],
            'authFetchAdverts'
        >
    >;
    deleteAnn?: MutationTrigger<
        MutationDefinition<
            string,
            BaseQueryFn<
                string | FetchArgs,
                unknown,
                FetchBaseQueryError,
                {},
                FetchBaseQueryMeta
            >,
            'Adverts' | 'MyAnnouncements',
            null,
            'authFetchAdverts'
        >
    >;
    setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
    isSuccessDelete?: boolean;
    isErrorDelete?: boolean;
}
