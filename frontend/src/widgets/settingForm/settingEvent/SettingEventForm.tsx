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

interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

const SettingEventForm = ({ setShowFilters }: Props) => {
    const [, setSearchParams] = useSearchParams();
    const { t } = useTranslation();

    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
    };

    const { register, handleSubmit, reset, control, setValue } =
        useForm<TypeOfEventFilter>();
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

    const onReset = () => {
        reset();
        scrollToTop();
    };

    return (
        <section className={formStyles.filters} onClick={handleClick}>
            <form
                className={styles.filterEventForm}
                onSubmit={handleSubmit(onsubmit)}
                id="form-setting-event"
            >
                <City control={control} setValue={setValue} />
                <DateOfStartEvent register={register} />
                <DateOfEndEvent register={register} />
                <EventPrice register={register} />
                <IsOnlineEvent register={register} />
                <input type="submit" value={t('filters.apply')} />
                <button
                    className={`${styles.reset_setting_form} ${formStyles.reset_setting_form}`}
                    onClick={onReset}
                >
                    <Reset color="#1F6FDE" />
                    {t('filters.reset')}
                </button>
            </form>
        </section>
    );
};

export default SettingEventForm;
