import { SubmitHandler, useForm } from 'react-hook-form';
import { Reset } from 'shared/ui/icons/icons-tools/Reset.tsx';
import { TypeOfEventFilter } from './libr/TypeOfEventFilter';
import {
    City,
    DateOfEndEvent,
    DateOfStartEvent,
    EventPrice,
    IsOnlineEvent,
} from 'features/settingCategoryForm/settingEvent';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getSearchParams } from './libr/getSearchParams.ts';
import { scrollToTop } from 'shared/utils/scrollToTop.ts';
import styles from './libr/settingEventFilter.module.scss';
import formStyles from 'widgets/settingForm/forms/filtersForm.module.scss';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { getDefaultValues } from './libr/getDefaultValues.ts';
import { District } from 'features/settingCategoryForm/settingEvent/District.tsx';

interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

const SettingEventForm = ({ setShowFilters }: Props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { t } = useTranslation();
    const { data } = useGetFiltersQuery('');
    const defaultValues = getDefaultValues(searchParams, data);

    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
    };

    const { register, handleSubmit, reset, control, setValue, watch } =
        useForm<TypeOfEventFilter>({ defaultValues });

    const onsubmit: SubmitHandler<TypeOfEventFilter> = (data) => {
        const { city, end_date, start_date, is_online, price } = data;

        const filters = getSearchParams({
            city,
            end_date,
            start_date,
            is_online,
            price,
        });

        setSearchParams(`category=event${filters}&page=1`);
        setShowFilters(false);
        scrollToTop();
    };

    const handleReset = () => {
        reset();
        setSearchParams('category=event&page=1');
        location.reload();
    };

    return (
        <section className={formStyles.filters} onClick={handleClick}>
            <form
                className={styles.filterEventForm}
                onSubmit={handleSubmit(onsubmit)}
                id="form-setting-event"
            >
                <District control={control} setValue={setValue} />
                <City control={control} setValue={setValue} watch={watch} />
                <DateOfStartEvent register={register} />
                <DateOfEndEvent register={register} />
                <EventPrice register={register} />
                <IsOnlineEvent register={register} />
                <input type="submit" value={t('filters.apply')} />
                <button
                    className={`${styles.reset_setting_form} ${formStyles.reset_setting_form}`}
                    onClick={handleReset}
                >
                    <Reset color="#1F6FDE" />
                    {t('filters.reset')}
                </button>
            </form>
        </section>
    );
};

export default SettingEventForm;
