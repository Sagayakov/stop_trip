import { Control, Controller, FormState } from 'react-hook-form';
import { Eye } from '../../../../../../shared/ui/icons/icons-tools/Eye';
import { AuthData } from '../../libr/EnterType';
import '../../libr/inputEmail.scss';
import { useRef } from 'react';

interface Props {
    formState: FormState<AuthData>;
    togglePass: boolean;
    setTogglePass: React.Dispatch<React.SetStateAction<boolean>>;
    control: Control<AuthData, string>;
}

export const InputPassword = ({
    formState,
    setTogglePass,
    togglePass,
    control
}: Props) => {
    const { errors } = formState;
    const inputRef = useRef<HTMLInputElement | null>(null);
    const handleToggle = () => {
        setTogglePass(!togglePass);
        inputRef?.current?.focus();
    };

    return (
        <div className="password-div">
            <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                    <input
                        {...field}
                        placeholder="Пароль"
                        autoComplete="current-password"
                        type={togglePass ? 'text' : 'password'}
                        style={{
                            border: `1px solid ${
                                errors.password ? '#FF3F25' : '#DCDCDC'
                            }`,
                        }}
                        onBlur={() => setTogglePass(false)}
                    />
                )}
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
