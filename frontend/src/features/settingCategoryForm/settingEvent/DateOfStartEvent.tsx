import { UseFormRegister } from 'react-hook-form';
import { TypeOfEventFilter } from '../../../widgets/settingForm/settingEvent/libr/TypeOfEventFilter';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<TypeOfEventFilter>;
}
export const DateOfStartEvent = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="dateOfStartEvent">
            <h3>{t('filters.start')}</h3>
            <div className="setting-dateOfStartEvent">
                <span>{`${t('filters.date')}:`}</span>
                <input
                    type="date"
                    placeholder="Дата начала"
                    {...register('start_date.date')}
                />
                <span>{`${t('filters.time')}:`}</span>
                <input
                    type="time"
                    placeholder="Время начала"
                    {...register('start_date.time')}
                />
            </div>
        </div>
    );
};
