import { SubmitHandler, useForm } from 'react-hook-form';
import { Reset } from 'shared/ui/icons/icons-tools/Reset.tsx';
import { TypeOfEventFilter } from './libr/TypeOfEventFilter';
import {
    DateOfEndEvent,
    DateOfStartEvent,
    EventPrice,
    IsOnlineEvent,
} from 'features/settingCategoryForm/settingEvent';
import './libr/settingEventFilter.scss';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getSearchParams } from './libr/getSearchParams.ts';
import { scrollToTop } from 'shared/utils/scrollToTop.ts';

interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

const SettingEventForm = ({ setShowFilters }: Props) => {
    const [, setSearchParams] = useSearchParams();
    const { t } = useTranslation();

    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
    };

    const { register, handleSubmit, reset } = useForm<TypeOfEventFilter>();
    const onsubmit: SubmitHandler<TypeOfEventFilter> = (data) => {
        const { end_date, start_date, is_online, price } = data;
        const filters = getSearchParams(end_date, start_date, is_online, price);
        setSearchParams(`category=event${filters}`);
        setShowFilters(false);
        scrollToTop()
    };

    const onReset = () => {
        reset();
        scrollToTop()
    };

    return (
        <section className="filters" onClick={handleClick}>
            <form className="filterEventForm" onSubmit={handleSubmit(onsubmit)}>
                <DateOfStartEvent register={register} />
                <DateOfEndEvent register={register} />
                <EventPrice register={register} />
                <IsOnlineEvent register={register} />
                <input type="submit" value={t('filters.apply')} />
                <button className="reset-setting-form" onClick={onReset}>
                    <Reset color="#1F6FDE" />
                    {t('filters.reset')}
                </button>
            </form>
        </section>
    );
};

export default SettingEventForm;
