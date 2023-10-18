import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { InputChechbox } from './inputsRegistration/inputCheckbox/InputCheckbox';
import { InputEmail } from './inputsRegistration/inputEmail/InputEmail';
import { InputName } from './inputsRegistration/inputName/InputName';
import { InputPassword } from './inputsRegistration/inputPassword/InputPassword';
import { InputRepeatPassword } from './inputsRegistration/inputPassword/InputRepeatPassword';
import { InputPhone } from './inputsRegistration/inputPhone/InputPhone';
import { InputSubmit } from './inputsRegistration/inputSubmit/InputSubmit';
import { AuthRegistration } from './libr/RegistrationTypes';
import './libr/formRegistration.scss';
import { createUser } from './api/createUser';
import { useAppDispatch } from '../../../../app/store/hooks';
import { setIsAuth } from '../../model/modalAuth/reducers/auth';
import { toggleModalEnter } from '../../../../features/header/model/modalAuth/reducers/toggleModal';
// import './inputsRegistration/inputRegistration.scss'

export const FormRegistration = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },

        watch,
    } = useForm<AuthRegistration>({
        mode: 'all',
    });

    const dispatch = useAppDispatch();

    const onsubmit: SubmitHandler<AuthRegistration> = async (submitData) => {
        const authUser = async () =>
            await createUser({
                full_name: submitData.userName,
                email: submitData.email,
                password: submitData.passWord,
                re_password: submitData.repeatPassword,
            });

        const result = await authUser();

        if (result) {
            dispatch(setIsAuth(true));
            dispatch(toggleModalEnter(false));
            reset();
        }
    };

    return (
        <form onSubmit={handleSubmit(onsubmit)} autoComplete="false">
            <InputName errors={errors} register={register} />
            <InputPhone errors={errors} register={register} />
            <InputEmail errors={errors} register={register} />
            <InputPassword
                errors={errors}
                register={register}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
            />
            <InputRepeatPassword
                errors={errors}
                register={register}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                watch={watch}
            />
            <InputChechbox register={register} errors={errors} />
            <InputSubmit isValid={isValid} />
        </form>
    );
};
