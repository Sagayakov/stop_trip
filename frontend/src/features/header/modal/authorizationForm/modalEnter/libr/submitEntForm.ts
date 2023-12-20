import { Dispatch } from '@reduxjs/toolkit';
import { UseFormReset } from 'react-hook-form';
import {
    setErrorEnter,
    setIsAuth,
} from '../../../../model/modalAuth/reducers/auth.ts';
import { toggleModalEnter } from 'features/header/model/modalAuth/reducers/toggleModal.ts';
import { signIn } from 'features/header/modal/authorizationForm/modalRegistration/api/signIn.ts';
import { AuthData } from './EnterType.ts';

export const submitEntForm = async (
    submitData: AuthData,
    dispatch: Dispatch,
    reset: UseFormReset<AuthData>
) => {
    /* await localStorage.setItem('rememberMe', submitData.rememberMe.toString()); */

    const authUser = async () =>
        await signIn({
            email: submitData.email,
            password: submitData.password,
        });

    const result = await authUser();

    if (result.status === 401) {
        return dispatch(setErrorEnter('Неверный логин или пароль'));
    }

    if (result) {
        dispatch(setIsAuth(true));
        dispatch(toggleModalEnter(false));
        reset();
    }
};
