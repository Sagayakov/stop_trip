import { Dispatch } from '@reduxjs/toolkit';
import { NewUser } from '../libr/RegistrationTypes';
import { setErrorRegistration } from 'features/header/model/modalAuth/reducers/auth.ts';
import { url } from 'shared/const/url';

export const createUser = async (body: NewUser, dispatch: Dispatch) => {
    try {
        const responce = await fetch(`${url}/api/auth/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        if (responce.status === 500) {
            await fetch(`${url}api/auth/users/resend_activation/`);
        }
        if (responce.status === 400) {
            //чтобы вывести ошибку "email уже используется" или еще какую-то
            const data = await responce.json();
            dispatch(setErrorRegistration(data));
        }

        if (responce.ok) {
            const data = await responce.json();
            return data;
        }
    } catch (e) {
        console.log(e);
    }
};
