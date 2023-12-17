import { UseFormRegister } from 'react-hook-form';
import { TypeOfEventFilter } from 'widgets/settingForm/settingEvent/libr/TypeOfEventFilter.ts';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<TypeOfEventFilter>;
}
export const EventPrice = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="eventPrice">
            <h3>{t('filters.price')}</h3>
            <div className="setting-eventPrice">
                <input
                    type="number"
                    min="0"
                    placeholder={t('filters.from')}
                    {...register('price.min')}
                />
                <input
                    type="number"
                    placeholder={t('filters.up-to')}
                    {...register('price.max')}
                />
            </div>
        </div>
    );
};
