import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from 'app/api/types/user.ts';
import { SettingTypes } from 'pages/mySettings/types/settingTypes.ts';
import { ChangePassword } from 'app/api/types/changePassword.ts';
import { url } from 'shared/const/url';

export const fetchUser = createApi({
    reducerPath: 'fetchUser',
    baseQuery: fetchBaseQuery({ baseUrl: `${url}/` }),
    endpoints: (build) => ({
        getUser: build.query<User, string>({
            query: (token) => ({
                url: '/api/auth/users/me/',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
        setUser: build.mutation<User, { body: SettingTypes; token: string }>({
            query: ({ body, token }) => ({
                url: '/api/auth/users/me/',
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body,
            }),
        }),
        setPassword: build.mutation<
            ChangePassword,
            { body: ChangePassword; token: string }
        >({
            query: ({ body, token }) => ({
                url: '/api/auth/users/set_password/',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body,
            }),
        }),
    }),
});

export const {
    useGetUserQuery,
    useSetUserMutation,
    useSetPasswordMutation,
    useLazyGetUserQuery,
} = fetchUser;
