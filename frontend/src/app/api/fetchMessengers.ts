import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { url } from 'shared/const/url';
import { AddMessengerType, MessengersType } from './types/messengers';
import Cookies from 'js-cookie';
import { Messenger } from 'pages/advertPage/libr/types';

export const fetchMessengers = createApi({
    reducerPath: 'fetchMessengers',
    tagTypes: ['Messengers'],
    baseQuery: fetchBaseQuery({ baseUrl: `${url}/` }),
    endpoints: (build) => ({
        getMessengers: build.query<Messenger[], string>({
            query: () => ({
                url: `api/messengers/all_messengers`,
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get('access_token')}`,
                },
            }),
            providesTags: ['Messengers'],
        }),
        getUserMessengers: build.query<MessengersType, string>({
            query: (page = '') => ({
                url: `api/messengers/${page ? `?page=${page}` : ''}`,
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get('access_token')}`,
                },
            }),
            providesTags: ['Messengers'],
        }),
        addMessenger: build.mutation<
            AddMessengerType,
            { body: AddMessengerType }
        >({
            query: ({ body }) => ({
                url: '/api/messengers/',
                method: 'POST',
                headers: {
                    'X-Csrftoken': `${Cookies.get('access_token')}`,
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get('access_token')}`,
                },
                body,
            }),
            invalidatesTags: ['Messengers'],
        }),
        updateMessenger: build.mutation<
            AddMessengerType,
            { body: AddMessengerType; id: string }
        >({
            query: ({ body, id }) => ({
                url: `/api/messengers/${id}`,
                method: 'PUT',
                headers: {
                    'X-Csrftoken': `${Cookies.get('access_token')}`,
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get('access_token')}`,
                },
                body,
            }),
            invalidatesTags: ['Messengers'],
        }),
        modifyMessenger: build.mutation<
            AddMessengerType,
            { body: Partial<AddMessengerType>; id: string }
        >({
            query: ({ body, id }) => ({
                url: `/api/messengers/${id}`,
                method: 'PATch',
                headers: {
                    'X-Csrftoken': `${Cookies.get('access_token')}`,
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get('access_token')}`,
                },
                body,
            }),
            invalidatesTags: ['Messengers'],
        }),
        deleteMessenger: build.mutation<null, { id: string }>({
            query: ({ id }) => ({
                url: `/api/messengers/${id}`,
                method: 'DELETE',
                headers: {
                    'X-Csrftoken': `${Cookies.get('access_token')}`,
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get('access_token')}`,
                },
            }),
            invalidatesTags: ['Messengers'],
        }),
    }),
});

export const {
    useGetMessengersQuery,
    useGetUserMessengersQuery,
    useAddMessengerMutation,
    useUpdateMessengerMutation,
    useModifyMessengerMutation,
    useDeleteMessengerMutation,
} = fetchMessengers;
