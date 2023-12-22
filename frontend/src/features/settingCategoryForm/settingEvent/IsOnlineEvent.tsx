import { UseFormRegister } from 'react-hook-form';
import { TypeOfEventFilter } from 'widgets/settingForm/settingEvent/libr/TypeOfEventFilter.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingEvent/libr/settingEventFilter.module.scss'

interface Props {
    register: UseFormRegister<TypeOfEventFilter>;
}

export const IsOnlineEvent = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.isOnline}>
            <div className={styles.setting_isOnline}>
                <label className="form_checkbox">
                    <input type="checkbox" {...register('is_online')} />
                    <span>
                        <b>{t('filters.is_online')}</b>
                    </span>
                </label>
            </div>
        </div>
    );
};
