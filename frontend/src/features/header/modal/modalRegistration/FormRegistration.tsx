import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../../app/store/hooks';
import { InputChechbox } from './inputsRegistration/inputCheckbox/InputCheckbox';
import { InputEmail } from './inputsRegistration/inputEmail/InputEmail';
import { InputName } from './inputsRegistration/inputName/InputName';
import { InputPassword } from './inputsRegistration/inputPassword/InputPassword';
import { InputRepeatPassword } from './inputsRegistration/inputPassword/InputRepeatPassword';
import { InputPhone } from './inputsRegistration/inputPhone/InputPhone';
import { InputSubmit } from './inputsRegistration/inputSubmit/InputSubmit';
import './libr/formRegistration.scss';
import { AuthRegistration } from './libr/RegistrationTypes';
import { submitRegForm } from './libr/onSubmitRegForm';
import { setLoading } from '../../../../entities/loading/model/setLoadingSlice';
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
        await dispatch(setLoading(true))
        await submitRegForm(submitData, dispatch, reset);
        await dispatch(setLoading(false))
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
