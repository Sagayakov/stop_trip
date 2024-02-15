import { UseFormRegister } from 'react-hook-form';
import { TypeOfEventFilter } from 'widgets/settingForm/settingEvent/libr/TypeOfEventFilter.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingEvent/libr/settingEventFilter.module.scss';
import { useSearchParams } from 'react-router-dom';

interface Props {
    register: UseFormRegister<TypeOfEventFilter>;
}
export const DateOfStartEvent = ({ register }: Props) => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const startParams = searchParams.get('start_date');
    const dateEndIndex = 10;
    const timeStartIndex = 11;
    const timeEndIndex = 16;
    const dateValue = startParams
        ? startParams.slice(0, dateEndIndex)
        : undefined;
    const timeValue = startParams
        ? startParams.slice(timeStartIndex, timeEndIndex)
        : undefined;

    return (
        <div className={styles.dateOfStartEvent}>
            <h3>{t('filters.start_date')}</h3>
            <div className={styles.setting_dateOfStartEvent}>
                <span>{`${t('filters.date')}:`}</span>
                <input
                    type="date"
                    placeholder="Дата начала"
                    defaultValue={dateValue}
                    {...register('start_date.date')}
                />
                <span>{`${t('filters.time')}:`}</span>
                <input
                    type="time"
                    placeholder="Время начала"
                    defaultValue={timeValue}
                    {...register('start_date.time')}
                />
            </div>
        </div>
    );
};
