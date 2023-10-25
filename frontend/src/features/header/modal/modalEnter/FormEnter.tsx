import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../../app/store/hooks';
import { Google } from '../../../../shared/ui/icons/icons-tools/Google';
import { Vk } from '../../../../shared/ui/icons/icons-tools/Vk';
import { CheckboxRememberMe } from './inputsEnter/CheckboxRememberMe';
import { InputSubmit } from './inputsEnter/InputSubmit';
import { InputEmail } from './inputsEnter/inputEmail/InputEmail';
import { InputPassword } from './inputsEnter/inputPassword/InputPassword';
import { AuthData } from './lib/EnterType';
import './lib/formEnter.scss';
import { submitEntForm } from './lib/submitEntForm';

export const FormEnter = () => {
    const [togglePass, setTogglePass] = useState(false);
    const { register, formState, handleSubmit, reset, control } =
        useForm<AuthData>({
            mode: 'onBlur',
        });
    const dispatch = useAppDispatch();

    const onsubmit: SubmitHandler<AuthData> = async (submitData) => {
        await submitEntForm(submitData, dispatch, reset)
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
