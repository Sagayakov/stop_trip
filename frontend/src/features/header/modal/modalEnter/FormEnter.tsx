import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../../app/store/hooks';
import { Google } from '../../../../shared/ui/icons/icons-tools/Google';
import { Vk } from '../../../../shared/ui/icons/icons-tools/Vk';
import { CheckboxRememberMe } from './inputsEnter/CheckboxRememberMe';
import { InputSubmit } from './inputsEnter/InputSubmit';
import { InputEmail } from './inputsEnter/inputEmail/InputEmail';
import { InputPassword } from './inputsEnter/inputPassword/InputPassword';
import './libr/formEnter.scss';
import { AuthData } from './libr/EnterType';
import { submitEntForm } from './libr/submitEntForm';
import { setIsResetPasswordModalOpen } from '../../../../features/header/model/modalAuth/reducers/isResetPasswordModalOpen';
import { toggleModalEnter } from '../../../../features/header/model/modalAuth/reducers/toggleModal';
import { setLoading } from '../../../../entities/loading/model/setLoadingSlice';

export const FormEnter = () => {
    const [togglePass, setTogglePass] = useState(false);
    const { register, formState, handleSubmit, reset, control } =
        useForm<AuthData>({
            mode: 'onBlur',
        });
    const dispatch = useAppDispatch();


    const onsubmit: SubmitHandler<AuthData> = async (submitData) => {
        await dispatch(setLoading(true))
        await submitEntForm(submitData, dispatch, reset);
        await dispatch(setLoading(false))
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
            <InputEmail formState={formState} register={register} />
            <InputPassword
                formState={formState}
                togglePass={togglePass}
                setTogglePass={setTogglePass}
                control={control}
            />
            <div className="forget-password" onClick={openResetPasswordModal}>
                Забыли пароль?
            </div>
            <CheckboxRememberMe register={register} />
            <InputSubmit />
            <div className="enter-with">
                Войти с помощью
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
