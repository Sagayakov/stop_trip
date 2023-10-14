import { FormState, UseFormRegister } from 'react-hook-form';
import { Eye } from '../../../../../../shared/ui/icons/icons-tools/Eye';
import { AuthData } from '../../lib/EnterType';
import '../../lib/inputEmail.scss';
import { useRef } from 'react';

interface Props {
    formState: FormState<AuthData>;
    register: UseFormRegister<AuthData>;
    togglePass: boolean;
    setTogglePass: React.Dispatch<React.SetStateAction<boolean>>;
}

export const InputPassword = ({
    formState,
    register,
    setTogglePass,
    togglePass,
}: Props) => {
    const { errors } = formState;
    const inputRef = useRef<HTMLInputElement | null>(null);
    const handleToggle = () => {
        setTogglePass(!togglePass);
        inputRef?.current?.focus();
    };

    return (
        <div className="password-div">
            <input
                {...register('password', {
                    required: true,
                    minLength: 5,
                    pattern:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/,
                })}
                placeholder="Пароль"
                type={togglePass ? 'text' : 'password'}
                style={{
                    border: `1px solid ${
                        errors?.password ? '#FF3F25' : '#DCDCDC'
                    }`,
                }}
                ref={inputRef}
                onBlur={() => setTogglePass(false)}
            />
            <div id="eye" onClick={handleToggle}>
                <Eye />
            </div>
            <div className="input-error">
                {errors?.password && (
                    <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                        Введите корректный пароль
                    </p>
                )}
            </div>
        </div>
    );
};
