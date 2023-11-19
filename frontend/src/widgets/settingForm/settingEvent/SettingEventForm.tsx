import { SubmitHandler, useForm } from 'react-hook-form';
import { Reset } from '../../../shared/ui/icons/icons-tools/Reset';
import { TypeOfEventFilter } from './libr/TypeOfEventFilter';
import { DateOfEndEvent, DateOfStartEvent, EventPrice, IsOnlineEvent } from '../../../features/settingCategoryForm/settingEvent';
import './libr/settingEventFilter.scss'

interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

export const SettingEventForm = ({ setShowFilters }: Props) => {
    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
    };

    const { register, handleSubmit, reset } =
        useForm<TypeOfEventFilter>();

    const onsubmit: SubmitHandler<TypeOfEventFilter> = (data) => {
        console.log(data);
        setShowFilters(false);
        reset();
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
                <input type="submit" value="Показать 100 объявлений" />
                <button className="reset-setting-form" onClick={onReset}>
                    <Reset color="#1F6FDE" />
                    Сбросить фильтры
                </button>
            </form>
        </section>
    );
};
