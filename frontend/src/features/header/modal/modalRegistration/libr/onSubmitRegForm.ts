import { setIsAuth } from '../../../model/modalAuth/reducers/auth';
import { toggleModalEnter } from '../../../model/modalAuth/reducers/toggleModal';
import { UseFormReset } from 'react-hook-form';
import { AuthRegistration } from './RegistrationTypes';
import { createUser } from '../api/createUser';
import { Dispatch } from '@reduxjs/toolkit';
import { setIsCheckMailModalOpen } from '../../../../../features/header/model/modalAuth/reducers/isCheckMailModalOpen';

export const submitRegForm = async (
    submitData: AuthRegistration,
    dispatch: Dispatch,
    reset: UseFormReset<AuthRegistration>
) => {
    const authUser = async () =>
        await createUser(
            {
                full_name: submitData.userName,
                email: submitData.email,
                password: submitData.passWord,
                re_password: submitData.repeatPassword,
            },
            dispatch
        );

    const result = await authUser();

    if (result) {
        dispatch(setIsAuth(true));
        dispatch(toggleModalEnter(false));
        dispatch(setIsCheckMailModalOpen(true));
        reset();
    }
};
