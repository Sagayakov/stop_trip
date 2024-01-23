import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'app/store/hooks.ts';
//import { Google } from 'shared/ui/icons/icons-tools/Google.tsx';
//import { Vk } from 'shared/ui/icons/icons-tools/Vk.tsx';
//import { CheckboxRememberMe } from './inputsEnter/CheckboxRememberMe';
import { InputSubmit } from './inputsEnter/InputSubmit.tsx';
import { InputEmail } from './inputsEnter/inputEmail/InputEmail.tsx';
import { InputPassword } from './inputsEnter/inputPassword/InputPassword.tsx';
import styles from './libr/formEnter.module.scss';
import { AuthData } from './libr/EnterType.ts';
import { submitEntForm } from './libr/submitEntForm.ts';
import { setIsResetPasswordModalOpen } from 'features/header/model/modalAuth/reducers/isResetPasswordModalOpen.ts';
import { setLoading } from 'entity/loading/model/setLoadingSlice.ts';
import { resetErrors } from 'features/header/model/modalAuth/reducers/auth.ts';
import { useTranslation } from 'react-i18next';

export const FormEnter = () => {
    const [togglePass, setTogglePass] = useState(false);
    const {
        formState: { errors, isValid },
        handleSubmit,
        reset,
        control,
        watch,
    } = useForm<AuthData>({
        mode: 'all',
    });
    const dispatch = useAppDispatch();
    const enterError = useAppSelector((state) => state.setIsAuth.errorEnter);
    const { t } = useTranslation();
    const [lengthError, setLengthError] = useState(false);
    const [dotError, setDotError] = useState(false);

    const onsubmit: SubmitHandler<AuthData> = async (submitData) => {
        dispatch(setLoading(true));
        await submitEntForm(submitData, dispatch, reset);
        if (enterError !== null) {
            dispatch(resetErrors());
        }
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('phonenumber');
        sessionStorage.removeItem('emailEnter');
        sessionStorage.removeItem('emailRegistration');
        dispatch(setLoading(false));
    };

    const openResetPasswordModal = () => {
        dispatch(setIsResetPasswordModalOpen(true));
    };

    return (
        <form
            className={styles.form_enter}
            onSubmit={handleSubmit(onsubmit)}
            autoComplete="false"
            id="form-enter"
        >
            <InputEmail
                errors={errors}
                control={control}
                watch={watch}
                lengthError={lengthError}
                setLengthError={setLengthError}
                dotError={dotError}
                setDotError={setDotError}
            />
            <InputPassword
                errors={errors}
                togglePass={togglePass}
                setTogglePass={setTogglePass}
                control={control}
            />
            <div
                className={styles.forget_password}
                onClick={openResetPasswordModal}
            >
                {t('modal-login.forgot')}
            </div>
            {/* <CheckboxRememberMe register={register} /> */}
            <InputSubmit isValid={isValid && !lengthError && !dotError} />
            {/* <div className={styles.enter_with}>
                {t('modal-login.login-help')}
                <div className={styles.google}>
                    <Google />
                </div>
                <div className={styles.vk}>
                    <Vk />
                </div>
            </div> */}
        </form>
    );
};
