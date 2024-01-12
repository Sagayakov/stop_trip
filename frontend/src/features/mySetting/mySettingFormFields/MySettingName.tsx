import { Control, Controller } from 'react-hook-form';
import styles from 'pages/mySettings/libr/mySettings.module.scss';
import { useTranslation } from 'react-i18next';
import { SettingTypes } from 'pages/mySettings/types/settingTypes.ts';
import { User } from 'app/api/types/user.ts';

interface Props {
    control: Control<SettingTypes, string>;
    data: User;
}

export const MySettingName = ({ control, data }: Props) => {
    const { t } = useTranslation();
    return (
        <>
            <h3>{t('my-settings.name')}:</h3>
            <Controller
                name="full_name"
                control={control}
                defaultValue={data.full_name || ''}
                render={({ field }) => (
                    <input
                        {...field}
                        placeholder={t(
                            'modal-registration.user-name'
                        )}
                    />
                )}
            />
            <div className={styles.errors}></div>
        </>
    );
};