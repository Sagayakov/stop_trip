import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from 'app/store/hooks.ts';
import { InputCheckbox } from './inputsRegistration/inputCheckbox/InputCheckbox';
import { InputEmail } from './inputsRegistration/inputEmail/InputEmail';
import { InputName } from './inputsRegistration/inputName/InputName';
import { InputPassword } from './inputsRegistration/inputPassword/InputPassword';
import { InputRepeatPassword } from './inputsRegistration/inputPassword/InputRepeatPassword';
import { InputPhone } from './inputsRegistration/inputPhone/InputPhone';
import { InputSubmit } from './inputsRegistration/inputSubmit/InputSubmit';
import styles from './libr/formRegistration.module.scss';
import { AuthRegistration } from './libr/RegistrationTypes';
import { submitRegForm } from './libr/onSubmitRegForm';
import { setLoading } from 'entities/loading/model/setLoadingSlice.ts';
import { resetErrors } from 'features/header/model/modalAuth/reducers/auth.ts';

export const FormRegistration = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
        getValues,
        watch
    } = useForm<AuthRegistration>({
        mode: 'all',
    });

    const dispatch = useAppDispatch();

    const onsubmit: SubmitHandler<AuthRegistration> = async (submitData) => {
        dispatch(setLoading(true))
        setTimeout(() => {
            submitRegForm(submitData, dispatch, reset);
            dispatch(setLoading(false))
        }, 1200);
        dispatch(resetErrors())
    };

    return (
        <form
            className={styles.form_registration}
            onSubmit={handleSubmit(onsubmit)}
            autoComplete="false"
        >
            <InputName errors={errors} register={register} />
            <InputPhone errors={errors} register={register} />
            <InputEmail errors={errors} register={register} watch={watch} />
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
                getValues={getValues}
            />
            <InputCheckbox register={register} errors={errors} />
            <InputSubmit isValid={isValid} />
        </form>
    );
};
