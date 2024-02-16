import {
    Control,
    Controller,
    FieldErrors,
    UseFormWatch,
} from 'react-hook-form';
import { useAppSelector } from 'app/store/hooks.ts';
import styleForError from 'features/header/modal/modal.module.scss';
import { AuthData } from '../../libr/EnterType.ts';
import { useTranslation } from 'react-i18next';
import { Dispatch, SetStateAction } from 'react';

interface Props {
    errors: FieldErrors<AuthData>;
    control: Control<AuthData, string>;
    watch: UseFormWatch<AuthData>;
    lengthError: boolean;
    setLengthError: Dispatch<SetStateAction<boolean>>;
    dotError: boolean;
    setDotError: Dispatch<SetStateAction<boolean>>;
}

export const InputEmail = ({
    errors,
    control,
    watch,
    lengthError,
    setLengthError,
    dotError,
    setDotError,
}: Props) => {
    const errorEnter = useAppSelector((state) => state.setIsAuth.errorEnter);
    const { t } = useTranslation();

    const email = watch('email');
    const handleBlur = () => {
        if (email.length !== 0) sessionStorage.setItem('emailEnter', email);
    };

    const oninput = (event: React.FormEvent<HTMLInputElement>) => {
        event.currentTarget.value = event.currentTarget.value.toLowerCase();
        const inputText = event.currentTarget.value;
        const atIndex = inputText.indexOf('@');
        const firstPart = inputText.slice(0, atIndex);
        const domainPart = inputText.slice(atIndex + 1);

        sessionStorage.setItem('emailEnter', inputText);

        setLengthError(
            firstPart.length >= 64 ||
                firstPart.length < 1 ||
                domainPart.length >= 64
        );
        setDotError(firstPart.startsWith('.'));
    };

    return (
        <>
            <Controller
                name="email"
                control={control}
                defaultValue={sessionStorage.getItem('emailEnter') || ''}
                rules={{
                    required: true,
                    pattern: {
                        value: /^(?!.*\.{2})[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]{2,}(?:\.[a-z]{2,})+$/i,
                        message: t('modal-login.correct-email'),
                    },
                    minLength: {
                        value: 10,
                        message: t('modal-registration.email-length'),
                    },
                    maxLength: {
                        value: 128,
                        message: t('modal-registration.email-length'),
                    },
                }}
                render={({ field }) => (
                    <input
                        {...field}
                        type="email"
                        placeholder="Email"
                        autoComplete="username"
                        onBlur={handleBlur}
                        onInput={(event) => oninput(event)}
                        style={{
                            border: `1px solid ${
                                errors.email ||
                                lengthError ||
                                errorEnter ||
                                dotError
                                    ? '#FF3F25'
                                    : '#DCDCDC'
                            }`,
                        }}
                    />
                )}
            />
            <div className={styleForError.input_error}>
                {(errors.email || dotError) && (
                    <p
                        style={{
                            color: '#FF3F25',
                            fontSize: '13px',
                            marginTop: 0,
                        }}
                    >
                        {errors?.email?.message ||
                            t('modal-login.correct-email')}
                    </p>
                )}
                {/* {lengthError && (
                    <p
                        style={{
                            color: '#FF3F25',
                            fontSize: '13px',
                            marginTop: 0,
                        }}
                    >
                        {t('modal-registration.email-length')}
                    </p>
                )} */}
            </div>
        </>
    );
};
