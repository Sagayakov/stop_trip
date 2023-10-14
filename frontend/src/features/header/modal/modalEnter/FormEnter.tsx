import { SubmitHandler, useForm } from 'react-hook-form';
import './lib/formEnter.scss';
import { InputSubmit } from './inputsEnter/InputSubmit';
import { InputEmail } from './inputsEnter/inputEmail/InputEmail';
import { InputPassword } from './inputsEnter/inputPassword/InputPassword';
import { useState } from 'react';
import { Google } from '../../../../shared/ui/icons/icons-tools/Google';
import { Vk } from '../../../../shared/ui/icons/icons-tools/Vk';
import { AuthData } from './lib/EnterType';

export const FormEnter = () => {
    const [togglePass, setTogglePass] = useState(false);
    const { register, formState, handleSubmit, reset } = useForm<AuthData>({
        mode: 'onBlur',
    });

    const onsubmit: SubmitHandler<AuthData> = (data) => {
        alert(JSON.stringify(data));
        reset();
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
                register={register}
                togglePass={togglePass}
                setTogglePass={setTogglePass}
            />
            <div className="forget-password">Забыли пароль?</div>
            <div className="remember-me">
                <label className="form-checkbox">
                    <input type="checkbox" name="" id="" />
                    <span>Запомнить аккаунт</span>
                </label>
            </div>
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
/* function useEffect(arg0: () => () => void, arg1: never[]) {
  throw new Error("Function not implemented.");
} */
