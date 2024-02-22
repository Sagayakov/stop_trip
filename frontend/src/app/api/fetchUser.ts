import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from 'app/api/types/user.ts';
import { SettingTypes } from 'pages/mySettings/types/settingTypes.ts';
import { ChangePassword } from 'app/api/types/changePassword.ts';
import { url } from 'shared/const/url';
import { refetchAccessTokenForPrepareHeaders } from 'app/api/handlers/refetchAccessTokenForPrepareHeaders.ts';

export const fetchUser = createApi({
    reducerPath: 'fetchUser',
    tagTypes: ['User'],
    baseQuery: fetchBaseQuery({ baseUrl: `${url}/`,
        credentials: 'include',
        prepareHeaders: refetchAccessTokenForPrepareHeaders //перед обращением к эндпоинту обновляем accessToken
    }),
    endpoints: (build) => ({
        getUser: build.query<User, ''>({
            query: () => ({
                url: '/api/auth/users/me/',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            providesTags: ['User'],
        }),
        setUser: build.mutation<User, SettingTypes>({
            query: (body) => ({
                url: '/api/auth/users/me/',
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            }),
            invalidatesTags: ['User'],
        }),
        setPassword: build.mutation<ChangePassword, ChangePassword>({
            query: (body) => ({
                url: '/api/auth/users/set_password/',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const {
    useGetUserQuery,
    useSetUserMutation,
    useSetPasswordMutation,
    useLazyGetUserQuery,
} = fetchUser;
