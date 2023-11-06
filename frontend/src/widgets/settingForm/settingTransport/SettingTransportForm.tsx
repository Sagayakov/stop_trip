import { SubmitHandler, useForm } from 'react-hook-form';
import {
    BodyTypeOfTransport,
    ConditionOfTransport,
    DriveType,
    EngineType,
    EngineСapacity,
    MarkOfTransport,
    ModelOfTransport,
    PassengerCapacityOfTransport,
    TransmissionType,
    TransportationCategory,
    TypeOfService,
    TypeOfTransport,
    YearOfProduction,
} from '../../../features/settingCategoryForm/settingTransportForm/index';
import { Reset } from '../../../shared/ui/icons/icons-tools/Reset';
import { TypeSettingTransport } from './TypeSettingTransport';
import './settingTransportForm.scss';

interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

export const SettingTransportForm = ({ setShowFilters }: Props) => {
    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
        // setShowDropDown(false);
    };

    const { register, handleSubmit, reset, watch } =
        useForm<TypeSettingTransport>();

    const onsubmit: SubmitHandler<TypeSettingTransport> = (data) => {
        console.log(data);
        setShowFilters(false);
        reset();
    };

    const onReset = () => {
        reset();
    };

    return (
        <section className="filters" onClick={handleClick}>
            <form onSubmit={handleSubmit(onsubmit)}>
                <TypeOfService register={register} />
                <TypeOfTransport register={register} />
                <TransportationCategory register={register} />
                <MarkOfTransport register={register} />
                <ModelOfTransport register={register} />
                <EngineType register={register} />
                <EngineСapacity register={register} />
                <DriveType register={register} watch={watch}/>
                <YearOfProduction register={register} />
                <TransmissionType register={register} watch={watch}/>
                <BodyTypeOfTransport register={register} watch={watch}/>
                <ConditionOfTransport register={register} watch={watch}/>
                <PassengerCapacityOfTransport
                    register={register}
                    watch={watch}
                />
                <input type="submit" value="Показать 100 объявлений" />
                <button className="reset-setting-form" onClick={onReset}>
                    <Reset color="#1F6FDE" />
                    Сбросить фильтры
                </button>
            </form>
        </section>
    );
};
