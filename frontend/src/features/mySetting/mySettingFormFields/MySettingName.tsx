import { Control, Controller, DeepRequired, FieldErrorsImpl, GlobalError } from 'react-hook-form';
import styles from 'pages/mySettings/libr/mySettings.module.scss';
import { useTranslation } from 'react-i18next';
import { SettingTypes } from 'pages/mySettings/types/settingTypes.ts';
import { User } from 'app/api/types/user.ts';

interface Props {
    control: Control<SettingTypes, string>;
    data: User;
    errors: Partial<FieldErrorsImpl<DeepRequired<SettingTypes>>> & {
        root?: Record<string, GlobalError> & GlobalError;
    };
}

export const MySettingName = ({ control, data, errors }: Props) => {
    const { t } = useTranslation();
    return (
        <>
            <h3>{t('my-settings.name')}:</h3>
            <Controller
                name="full_name"
                control={control}
                defaultValue={data.full_name || ''}
                rules={{
                    required: t('modal-registration.min-name-length'),
                    pattern: {
                        value: /^[\w\s-а-яА-ЯёЁ]+$/i,
                        message: t('modal-registration.wildcars-name'),
                    },
                    minLength: {
                        value: 2,
                        message: t('modal-registration.min-name-length')
                    },
                    maxLength: {
                        value: 50,
                        message: t('modal-registration.not-more-50'),
                    },
                }}
                render={({ field }) => (
                    <input
                        {...field}
                        placeholder={t(
                            'modal-registration.user-name'
                        )}
                        style={errors.full_name && {border: '1px solid #ff2d55'}}
                    />
                )}
            />
            <div className={styles.errors}>
                {errors?.full_name && errors.full_name.message}
            </div>
        </>
    );
};