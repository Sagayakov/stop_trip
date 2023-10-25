import { Dispatch } from '@reduxjs/toolkit';
import { setErrorEmail } from '../../../../../features/header/model/modalAuth/reducers/auth';
import { NewUser } from '../libr/RegistrationTypes';

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
            //чтобы вывести ошибку "email уже используется"
            const data = await responce.json();
            dispatch(setErrorEmail(data));
        }
        const data = await responce.json();
        console.log('data', data);
        if ((await responce).ok) {
            return data;
        }
    } catch (e) {
        console.log(e);
    }
};
