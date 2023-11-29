import { SubmitHandler, useForm } from 'react-hook-form';
import { Reset } from '../../../shared/ui/icons/icons-tools/Reset';
import { TypeOfEventFilter } from './libr/TypeOfEventFilter';
import {
    DateOfEndEvent,
    DateOfStartEvent,
    EventPrice,
    IsOnlineEvent } from '../../../features/settingCategoryForm/settingEvent';
import './libr/settingEventFilter.scss'
import { useSearchParams } from 'react-router-dom';

interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

export const SettingEventForm = ({ setShowFilters }: Props) => {
    const [, setSearchParams] = useSearchParams();

    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
    };

    const { register, handleSubmit, reset } =
        useForm<TypeOfEventFilter>();

    const onsubmit: SubmitHandler<TypeOfEventFilter> = (data) => {
        const { end_date, start_date, is_online, price } = data;
        const isOnlineQuery = is_online ? '&is_online=true' : '';
        const priceMaxQuery = price.max ? `&price_max=${price.max}` : '';
        const priceMinQuery = price.min ? `&price_min=${price.min}` : '';
        const startDateQuery = start_date.date
            ? `&start_date=${start_date.date}${start_date.time && `Т${end_date.time}:00%2B03${':'}00`}`
            : '';
        const endDateQuery = end_date.date
            ? `&end_date=${end_date.date}${end_date.time && `Т${start_date.time}:00%2B03${':'}00`}`
            : '';
        const filters = `${startDateQuery}${endDateQuery}${isOnlineQuery}${priceMinQuery}${priceMaxQuery}`;
        setSearchParams(`category=event${filters}`);

        setShowFilters(false);
    };

    const onReset = () => {
        reset();
    };

    return (
        <section className="filters" onClick={handleClick}>
            <form className="filterEventForm" onSubmit={handleSubmit(onsubmit)}>
                <DateOfStartEvent register={register}/>
                <DateOfEndEvent register={register}/>
                <EventPrice register={register}/>
                <IsOnlineEvent register={register}/>
                <input type="submit" value="Применить" />
                <button className="reset-setting-form" onClick={onReset}>
                    <Reset color="#1F6FDE" />
                    Сбросить фильтры
                </button>
            </form>
        </section>
    );
};
