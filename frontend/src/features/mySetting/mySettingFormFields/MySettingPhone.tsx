import {
    Control,
    Controller,
    DeepRequired,
    FieldErrorsImpl,
    GlobalError,
} from 'react-hook-form';
import { SettingTypes } from 'pages/mySettings/types/settingTypes.ts';
import { User } from 'app/api/types/user.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/mySettings/libr/mySettings.module.scss';

interface Props {
    control: Control<SettingTypes, string>;
    data: User;
    errors: Partial<FieldErrorsImpl<DeepRequired<SettingTypes>>> & {
        root?: Record<string, GlobalError> & GlobalError;
    };
}

export const MySettingPhone = ({ data, control, errors }: Props) => {
    const { t } = useTranslation();
    return (
        <>
            <h3>{t('my-settings.phone')}:</h3>
            <Controller
                name="phone"
                control={control}
                defaultValue={data.phone || ''}
                rules={{
                    minLength: 5,
                    pattern:
                        /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){7,14}(\s*)?$/,
                }}
                render={({ field }) => (
                    <input
                        {...field}
                        placeholder={t('modal-registration.phone')}
                        style={{
                            border: `1px solid ${
                                errors?.phone ? '#FF3F25' : '#DCDCDC'
                            }`,
                        }}
                    />
                )}
            />
            <div className={styles.errors}>
                {errors?.phone && (
                    <p style={{ color: '#FF3F25', fontSize: '13px' }}>
                        {t('modal-registration.correct-number')}
                    </p>
                )}
            </div>
        </>
    );
};
