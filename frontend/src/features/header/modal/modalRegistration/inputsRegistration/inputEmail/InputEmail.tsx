/* eslint-disable no-useless-escape */
import { useState } from 'react';
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { useAppSelector } from '../../../../../../app/store/hooks';
import { AuthRegistration } from '../../libr/RegistrationTypes';

interface Props {
    errors: FieldErrors<AuthRegistration>;
    register: UseFormRegister<AuthRegistration>;
    watch: UseFormWatch<AuthRegistration>;
}

export const InputEmail = ({ errors, register, watch }: Props) => {
    const emailErrors = useAppSelector(
        (state) => state.setIsAuth.errorRepeatEmail
    ); //ошибка повторного использования email

    const [emailDomeinLengthError, setEmailDomeinLengthError] = useState(false);
    const [emailDomeinLength, setEmailDomeinLength] = useState(false);
    const [twoPoints, setTwoPoints] = useState(false);
    const [startEndError, setStartEndError] = useState(false);
    const allLength = watch('email');

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;

        if (allLength.length >= 128) {
            setEmailDomeinLengthError(true);
        } else {
            setEmailDomeinLengthError(false);
        }

        const atIndex = inputValue.indexOf('@');

        inputValue.length > 64 && atIndex === -1
            ? setEmailDomeinLengthError(true)
            : setEmailDomeinLengthError(false);
    };

    const oninput = (event: React.FormEvent<HTMLInputElement>) => {
        // eslint-disable-next-line prefer-const
        event.currentTarget.value = event.currentTarget.value.toLowerCase();
        let inputText = event.currentTarget.value;
        const atIndex = inputText.indexOf('@');
        const firstPart = inputText.slice(0, atIndex);
        const domainPart = inputText.slice(atIndex + 1);

        if (firstPart.length >= 64 || firstPart.length < 1) {
            setEmailDomeinLengthError(true);
        } else {
            setEmailDomeinLengthError(false);
        }
        if (domainPart.length >= 64) {
            setEmailDomeinLengthError(true);
        } else {
            setEmailDomeinLengthError(false);
        }
        if (inputText.length > 128) {
            setEmailDomeinLength(true);
        } else {
            setEmailDomeinLength(false);
        }

        if (firstPart.includes('..') || domainPart.includes('..')) {
            setTwoPoints(true);
        } else setTwoPoints(false);

        const firstSymbol = domainPart.charAt(0);
        const lastSymbol = domainPart.charAt(domainPart.length - 1);

        const isDigitOrHyphen = (char: string) =>
            !isNaN(parseInt(char, 10)) || char === '-';

        if (
            isDigitOrHyphen(firstSymbol) ||
            isDigitOrHyphen(lastSymbol) ||
            isDigitOrHyphen(firstPart[0]) ||
            isDigitOrHyphen(firstPart[firstPart.length-1])
        ) {
            setStartEndError(true);
        } else {
            setStartEndError(false);
        }

        const cyrillicRegex = /[а-яА-ЯёЁ]/g;

        if (cyrillicRegex.test(inputText)) {
            inputText = inputText.replace(cyrillicRegex, '');
            event.currentTarget.value = inputText;
        }

        if (atIndex > -1) {
            const domainPartLowerCase = domainPart.toLowerCase();
            if (domainPart !== domainPartLowerCase || domainPart.length > 63) {
                event.currentTarget.value =
                    inputText.slice(0, atIndex + 1) +
                    domainPartLowerCase.slice(0, 63);
            }
        }
    };

    const borderError = () => {
        return (
            errors.email ||
            emailDomeinLength ||
            emailDomeinLengthError ||
            emailErrors ||
            twoPoints ||
            startEndError
        );
    };

    return (
        <>
            <input
                {...register('email', {
                    required: true,
                    pattern:
                        /^(?!.*\.{2})[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]{2,}(?:\.[a-z]{2,})+$/i,
                    // /^(?!.*\.{2})[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z]{2,})+$/i,
                    // /^(?!.*\.{2})[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)+$/,
                    minLength: 10,
                    maxLength: 128,
                })}
                onChange={handleEmailChange}
                type="email"
                placeholder="Email"
                autoComplete="username"
                onInput={(event) => oninput(event)}
                style={{
                    border: `1px solid ${
                        borderError() ? '#FF3F25' : '#DCDCDC'
                    }`,
                }}
            />
            <div className="input-error">
                {errors?.email && (
                    <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                        Введите корректный email
                    </p>
                )}
                {emailErrors && (
                    <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                        Пользователь с такой почтой уже существует
                    </p>
                )}
                {errors?.email?.type === 'minLength' && (
                    <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                        Минимальная длина email - 10 символов
                    </p>
                )}
                {errors?.email?.type === 'minLength' && (
                    <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                        Максимальная длина email - 80 символов
                    </p>
                )}
                {(emailDomeinLengthError || emailDomeinLength) && (
                    <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                        Превышена максимальная длина адреса до или после символа
                        @, введите не более 64, либо превышена общая
                        максимальная длина (128 символов)
                    </p>
                )}
                {twoPoints && (
                    <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                        {'Нельзя вводить 2 точки подряд'}
                    </p>
                )}
                {startEndError && (
                    <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                        Доменная часть не может иметь в начале или в конце цифру
                        или тире
                    </p>
                )}
            </div>
        </>
    );
};
