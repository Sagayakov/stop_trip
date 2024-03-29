import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ResetPasswordType } from './libr/types';
import { InputPassword } from './inputs/InputPassword';
import { InputRepeatPassword } from './inputs/InputRepeatPassword';
import { InputSubmit } from './inputs/InputSubmit';
import { confimResetPassword } from './api/confirmResetPassword';
import { NavLink, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/store/hooks.ts';
import { Dispatch } from '@reduxjs/toolkit';
import { setLoading } from 'entity/loading/model/setLoadingSlice.ts';
import { LoadingWithBackground } from 'entity/loading/LoadingWithBackground.tsx';
import { useTranslation } from 'react-i18next';
import styles from 'pages/resetPassword/resetPassword.module.scss';

const FormConfirmResetPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        watch,
    } = useForm<ResetPasswordType>({
        mode: 'all',
    });
    const { uid, token } = useParams();
    const [success, setSuccess] = useState<boolean>(false);
    const dispatch: Dispatch = useAppDispatch();
    const load = useAppSelector((state) => state.setLoading.loading);
    const { t } = useTranslation();

    const onsubmit: SubmitHandler<ResetPasswordType> = async (submitData) => {
        if (uid && token) {
            dispatch(setLoading(true));

            const response = await confimResetPassword({
                new_password: submitData.password,
                uid,
                token,
            });
            if (response.ok) {
                setSuccess(true);
                dispatch(setLoading(false));
            }
        }
    };

    return (
        <div className={styles.reset}>
            {load && <LoadingWithBackground />}
            {!success ? (
                <form
                    className={styles.form}
                    onSubmit={handleSubmit(onsubmit)}
                    autoComplete="false"
                    id="form-confirm-reset-password"
                >
                    <InputPassword errors={errors} register={register} />
                    <InputRepeatPassword
                        errors={errors}
                        register={register}
                        watch={watch}
                    />
                    <InputSubmit isValid={isValid} watch={watch} />
                </form>
            ) : (
                <div className={styles.reset_success}>
                    {t('reset-page.success')}
                    <NavLink className={styles.main_link} to={'/'}>
                        {t('reset-page.back')}
                    </NavLink>
                </div>
            )}
        </div>
    );
};

export default FormConfirmResetPassword;
