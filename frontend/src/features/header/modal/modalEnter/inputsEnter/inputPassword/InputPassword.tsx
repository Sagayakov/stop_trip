import { useRef } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { useAppSelector } from '../../../../../../app/store/hooks';
import { Eye } from '../../../../../../shared/ui/icons/icons-tools/Eye';
import '../../libr/inputEmail.scss';
import { AuthData } from '../../libr/EnterType';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

interface Props {
    errors: FieldErrors<AuthData>;
    togglePass: boolean;
    setTogglePass: React.Dispatch<React.SetStateAction<boolean>>;
    control: Control<AuthData, string>;
}

export const InputPassword = ({
    errors,
    setTogglePass,
    togglePass,
    control,
}: Props) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const errorEnter = useAppSelector((state) => state.setIsAuth.errorEnter);
    const { t } = useTranslation();

    const handleToggle = () => {
        setTogglePass(!togglePass);
        inputRef?.current?.focus();
    };

    const handleCopy = (event: React.ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        toast.error(`${t('modal-login.copy-password')}`);
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
                        onCopy={(event) => handleCopy(event)}
                        placeholder={t('modal-login.password')}
                        autoComplete="current-password"
                        type={togglePass ? 'text' : 'password'}
                        style={{
                            border: `1px solid ${
                                errors.password || errorEnter
                                    ? '#FF3F25'
                                    : '#DCDCDC'
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
                        {t('modal-login.correct-password')}
                    </p>
                )}
                {errorEnter && (
                    <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                        {errorEnter}
                    </p>
                )}
            </div>
        </div>
    );
};
