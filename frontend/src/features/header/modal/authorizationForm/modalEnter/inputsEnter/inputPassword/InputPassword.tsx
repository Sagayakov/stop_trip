import { useRef } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { useAppSelector } from 'app/store/hooks.ts';
import { Eye } from 'shared/ui/icons/icons-tools/Eye.tsx';
import styles from '../../libr/formEnter.module.scss';
import styleForError from 'features/header/modal/modal.module.scss';
import { AuthData } from '../../libr/EnterType.ts';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { ErrorNode } from './libr/ErrorNode.tsx';

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
        <div className={styles.password_div}>
            <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                    required: true,
                    maxLength: 22,
                }}
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
                        //onBlur={() => setTogglePass(false)}
                    />
                )}
            />
            <div id={styles.eye} onClick={handleToggle}>
                <Eye />
            </div>
            <div className={styleForError.input_error}>
                {errors?.password && (
                    <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                        {t('modal-login.correct-password')}
                    </p>
                )}
                {errorEnter && <ErrorNode text={errorEnter} />}
            </div>
        </div>
    );
};
