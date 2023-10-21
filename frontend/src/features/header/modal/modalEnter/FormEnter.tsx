import { SubmitHandler, useForm } from 'react-hook-form';
import './libr/formEnter.scss';
import { InputSubmit } from './inputsEnter/InputSubmit';
import { InputEmail } from './inputsEnter/inputEmail/InputEmail';
import { InputPassword } from './inputsEnter/inputPassword/InputPassword';
import { useState } from 'react';
import { Google } from '../../../../shared/ui/icons/icons-tools/Google';
import { Vk } from '../../../../shared/ui/icons/icons-tools/Vk';
import { AuthData } from './libr/EnterType';
import { signIn } from '../modalRegistration/api/signIn';
import { useAppDispatch } from '../../../../app/store/hooks';
import { setIsAuth } from '../../../../features/header/model/modalAuth/reducers/auth';
import { toggleModalEnter } from '../../../../features/header/model/modalAuth/reducers/toggleModal';
import { CheckboxRememberMe } from './inputsEnter/CheckboxRememberMe';

export const FormEnter = () => {
    const [togglePass, setTogglePass] = useState(false);
    const { register, formState, handleSubmit, reset, control } = useForm<AuthData>({
        mode: 'onBlur',
    });
    const dispatch = useAppDispatch();

    const onsubmit: SubmitHandler<AuthData> = async (submitData) => {
        const authUser = async () =>
            await signIn({
                email: submitData.email,
                password: submitData.password,
            });

        const result = await authUser();

        localStorage.setItem('rememberMe', submitData.rememberMe.toString())
        
        if (result) {
            dispatch(setIsAuth(true));
            dispatch(toggleModalEnter(false));
            reset();
        }
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
            <div className="forget-password">Забыли пароль?</div>
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
