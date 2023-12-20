import { Dispatch } from '@reduxjs/toolkit';
import { NewUser } from '../libr/RegistrationTypes';
import { setErrorRegistration } from 'features/header/model/modalAuth/reducers/auth.ts';

export const createUser = async (body: NewUser, dispatch: Dispatch) => {
    const url = import.meta.env.VITE_BASE_URL;
    try {
        const responce = await fetch(`${url}/api/auth/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        if (responce.status === 500) {
            console.log(500);
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
