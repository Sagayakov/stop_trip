import { UseFormRegister } from 'react-hook-form';
import { TypeOfEventFilter } from 'widgets/settingForm/settingEvent/libr/TypeOfEventFilter.ts';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<TypeOfEventFilter>;
}
export const DateOfEndEvent = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="dateOfEndEvent">
            <h3>{t('filters.end_date')}</h3>
            <div className="setting-dateOfEndEvent">
                <span>{`${t('filters.date')}:`}</span>
                <input
                    type="date"
                    placeholder="Дата окончания"
                    {...register('end_date.date')}
                />
                <span>{`${t('filters.time')}:`}</span>
                <input
                    type="time"
                    placeholder="Время окончания"
                    {...register('end_date.time')}
                />
            </div>
        </div>
    );
};
