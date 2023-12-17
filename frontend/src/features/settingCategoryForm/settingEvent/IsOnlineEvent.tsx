import { UseFormRegister } from 'react-hook-form';
import { TypeOfEventFilter } from 'widgets/settingForm/settingEvent/libr/TypeOfEventFilter.ts';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<TypeOfEventFilter>;
}

export const IsOnlineEvent = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="isOnline">
            {/* <h3>Онлайн</h3> */}
            <div className="setting-isOnline">
                <label className="form-checkbox">
                    <input type="checkbox" {...register('is_online')} />
                    <span>
                        <b>{t('filters.is_online')}</b>
                    </span>
                </label>
            </div>
        </div>
    );
};
