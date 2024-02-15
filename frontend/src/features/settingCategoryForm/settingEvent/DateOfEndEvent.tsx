import { UseFormRegister } from 'react-hook-form';
import { TypeOfEventFilter } from 'widgets/settingForm/settingEvent/libr/TypeOfEventFilter.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingEvent/libr/settingEventFilter.module.scss';
import { useSearchParams } from 'react-router-dom';

interface Props {
    register: UseFormRegister<TypeOfEventFilter>;
}
export const DateOfEndEvent = ({ register }: Props) => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const endParams = searchParams.get('end_date');
    const dateEndIndex = 10;
    const timeStartIndex = 11;
    const timeEndIndex = 16;
    const dateValue = endParams ? endParams.slice(0, dateEndIndex) : undefined;
    const timeValue = endParams
        ? endParams.slice(timeStartIndex, timeEndIndex)
        : undefined;

    return (
        <div className={styles.dateOfEndEvent}>
            <h3>{t('filters.end_date')}</h3>
            <div className={styles.setting_dateOfEndEvent}>
                <span>{`${t('filters.date')}:`}</span>
                <input
                    type="date"
                    placeholder="Дата окончания"
                    defaultValue={dateValue}
                    {...register('end_date.date')}
                />
                <span>{`${t('filters.time')}:`}</span>
                <input
                    type="time"
                    placeholder="Время окончания"
                    defaultValue={timeValue}
                    {...register('end_date.time')}
                />
            </div>
        </div>
    );
};
