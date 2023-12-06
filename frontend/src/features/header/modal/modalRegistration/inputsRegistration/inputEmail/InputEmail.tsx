/* eslint-disable no-useless-escape */
import { useState } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { useAppSelector } from '../../../../../../app/store/hooks';
import { AuthRegistration } from '../../libr/RegistrationTypes';

interface Props {
    errors: FieldErrors<AuthRegistration>;
    register: UseFormRegister<AuthRegistration>;
}

export const InputEmail = ({ errors, register }: Props) => {
    const emailErrors = useAppSelector(
        (state) => state.setIsAuth.errorEmail?.email
    ); //ошибка повторного использования email

    const [emailLengthError, setEmailLengthError] = useState(false);
    const [emailDomeinLengthError, setEmailDomeinLengthError] = useState(false);
    const [twoPoints, setTwoPoints] = useState(false);
    const [startEndError, setStartEndError] = useState(false);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const atIndex = inputValue.indexOf('@');

        inputValue.length > 64 && atIndex === -1
            ? setEmailLengthError(true)
            : setEmailLengthError(false);
    };

    const oninput = (event: React.FormEvent<HTMLInputElement>) => {
        let inputText = event.currentTarget.value;
        const atIndex = inputText.indexOf('@');
        const firstPart = inputText.slice(0, atIndex);
        const domainPart = inputText.slice(atIndex + 1);

        if (domainPart.length >= 63) setEmailDomeinLengthError(true);
        else setEmailDomeinLengthError(false);

        if (firstPart.includes('..') || domainPart.includes('..')) {
            setTwoPoints(true);
        } else setTwoPoints(false);

        const firstSymbol = domainPart.charAt(0);
        const lastSymbol = domainPart.charAt(domainPart.length - 1);

        const isDigitOrHyphen = (char: string) =>
            !isNaN(parseInt(char, 10)) || char === '-';

        if (isDigitOrHyphen(firstSymbol) || isDigitOrHyphen(lastSymbol)) {
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
            errors.email || emailLengthError || emailDomeinLengthError || emailErrors || twoPoints || startEndError
        );
    };

    return (
        <>
            <input
                {...register('email', {
                    required: true,
                    pattern:
                        /^(?!.*\.{2})[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)+$/,
                    minLength: 10,
                    maxLength: 80,
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
                {(errors?.email && (
                    <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                        Введите корректный email
                    </p>
                )) ||
                    (emailErrors && (
                        <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                            Пользователь с такой почтой уже существует
                        </p>
                    ))}
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
                {emailLengthError ||
                    (emailDomeinLengthError && (
                        <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                            {
                                'Превышена максимальная длина адреса до или после символа @, введите не более 64'
                            }
                        </p>
                    ))}
                {twoPoints && (
                    <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                        {'Нельзя вводить 2 точки подряд'}
                    </p>
                )}
                {startEndError && (
                    <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                        {
                            'Доменная часть не может иметь в начале или в конце цифру или тире'
                        }
                    </p>
                )}
            </div>
        </>
    );
};
