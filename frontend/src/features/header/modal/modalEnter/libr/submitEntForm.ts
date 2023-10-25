import { Dispatch } from '@reduxjs/toolkit';
import { UseFormReset } from 'react-hook-form';
import {
    setErrorEnter,
    setIsAuth,
} from '../../../model/modalAuth/reducers/auth';
import { toggleModalEnter } from '../../../model/modalAuth/reducers/toggleModal';
import { signIn } from '../../modalRegistration/api/signIn';
import { AuthData } from './EnterType';

export const submitEntForm = async (
    submitData: AuthData,
    dispatch: Dispatch,
    reset: UseFormReset<AuthData>
) => {
    await localStorage.setItem('rememberMe', submitData.rememberMe.toString());

    const authUser = async () =>
        await signIn({
            email: submitData.email,
            password: submitData.password,
        });

    const result = await authUser();

    if (result.status === 401) {
        return dispatch(setErrorEnter());
    }

    if (result) {
        dispatch(setIsAuth(true));
        dispatch(toggleModalEnter(false));
        reset();
    }
};
