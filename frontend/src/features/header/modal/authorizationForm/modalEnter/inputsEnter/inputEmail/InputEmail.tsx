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

interface Props {
    errors: FieldErrors<AuthData>;
    control: Control<AuthData, string>;
    watch: UseFormWatch<AuthData>;
}

export const InputEmail = ({ errors, control, watch }: Props) => {
    const errorEnter = useAppSelector((state) => state.setIsAuth.errorEnter);
    const { t } = useTranslation();

    const email = watch('email');
    const handleBlur = () => sessionStorage.setItem('emailEnter', email);

    return (
        <>
            <Controller
                name="email"
                control={control}
                defaultValue={sessionStorage.getItem('emailEnter') || ''}
                rules={{
                    required: true,
                    pattern:
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    minLength: 10,
                }}
                render={({ field }) => (
                    <input
                        {...field}
                        type="email"
                        placeholder="Email"
                        autoComplete="username"
                        onBlur={handleBlur}
                        style={{
                            border: `1px solid ${
                                errors?.email || errorEnter
                                    ? '#FF3F25'
                                    : '#DCDCDC'
                            }`,
                        }}
                    />
                )}
            />
            <div className={styleForError.input_error}>
                {errors?.email && (
                    <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                        {t('modal-login.correct-email')}
                    </p>
                )}
            </div>
        </>
    );
};
