import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { Google } from '../../../../shared/ui/icons/icons-tools/Google';
import { Vk } from '../../../../shared/ui/icons/icons-tools/Vk';
//import { CheckboxRememberMe } from './inputsEnter/CheckboxRememberMe';
import { InputSubmit } from './inputsEnter/InputSubmit';
import { InputEmail } from './inputsEnter/inputEmail/InputEmail';
import { InputPassword } from './inputsEnter/inputPassword/InputPassword';
import './libr/formEnter.scss';
import { AuthData } from './libr/EnterType';
import { submitEntForm } from './libr/submitEntForm';
import { setIsResetPasswordModalOpen } from '../../../../features/header/model/modalAuth/reducers/isResetPasswordModalOpen';
import { toggleModalEnter } from '../../../../features/header/model/modalAuth/reducers/toggleModal';
import { setLoading } from '../../../../entities/loading/model/setLoadingSlice';
import { resetErrors } from '../../../../features/header/model/modalAuth/reducers/auth';
import { useTranslation } from 'react-i18next';

export const FormEnter = () => {
    const [togglePass, setTogglePass] = useState(false);
    const {
        formState: { errors, isValid },
        handleSubmit,
        reset,
        control,
    } = useForm<AuthData>({
        mode: 'onBlur',
    });
    const dispatch = useAppDispatch();
    const enterError = useAppSelector((state) => state.setIsAuth.errorEnter);
    const { t } = useTranslation();

    const onsubmit: SubmitHandler<AuthData> = async (submitData) => {
        await dispatch(setLoading(true));
        await submitEntForm(submitData, dispatch, reset);
        if (enterError !== null) {
            await dispatch(resetErrors());
        }
        await dispatch(setLoading(false));
    };

    const openResetPasswordModal = () => {
        dispatch(toggleModalEnter(false));
        dispatch(setIsResetPasswordModalOpen(true));
    };

    return (
        <form
            className="form-enter"
            onSubmit={handleSubmit(onsubmit)}
            autoComplete="false"
        >
            <InputEmail errors={errors} control={control} />
            <InputPassword
                errors={errors}
                togglePass={togglePass}
                setTogglePass={setTogglePass}
                control={control}
            />
            <div className="forget-password" onClick={openResetPasswordModal}>
                {t('modal-login.forgot')}
            </div>
            {/* <CheckboxRememberMe register={register} /> */}
            <InputSubmit isValid={isValid} />
            <div className="enter-with">
                {t('modal-login.login-help')}
                <div className="google">
                    <Google />
                </div>
                <div className="vk">
                    <Vk />
                </div>
            </div>
        </form>
    );
};
