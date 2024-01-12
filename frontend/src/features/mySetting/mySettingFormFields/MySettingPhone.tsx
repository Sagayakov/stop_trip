import { Control, Controller } from 'react-hook-form';
import { SettingTypes } from 'pages/mySettings/types/settingTypes.ts';
import { User } from 'app/api/types/user.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/mySettings/libr/mySettings.module.scss';

interface Props {
    control: Control<SettingTypes, string>;
    data: User;
}

export const MySettingPhone = ({ data, control }: Props) => {
    const { t } = useTranslation();
    return (
        <>
            <h3>{t('my-settings.phone')}:</h3>
            <Controller
                name="phone"
                control={control}
                defaultValue={data.phone || ''}
                render={({ field }) => (
                    <input
                        {...field}
                        placeholder={t(
                            'modal-registration.phone'
                        )}
                    />
                )}
            />
            <div className={styles.errors}></div>
        </>
    );
};