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
import { TypeSettingTransport } from './libr/TypeSettingTransport';
import '././libr/settingTransportForm.scss';
import { closeDropdown } from '../../../features/settingCategoryForm/settingTransportForm/reducer/closeTransportFormDropdown';
import { useAppDispatch } from '../../../app/store/hooks';

interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

export const SettingTransportForm = ({ setShowFilters }: Props) => {
    const dispatch = useAppDispatch()

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
        <section className="filters">
            <form onSubmit={handleSubmit(onsubmit)}>
                <div
                    className="typeOfService-background"
                    onClick={() => dispatch(closeDropdown())}
                />
                <TypeOfService register={register} watch={watch} />
                <TypeOfTransport register={register} watch={watch} />
                <TransportationCategory register={register} watch={watch} />
                <MarkOfTransport register={register} watch={watch} />
                <ModelOfTransport register={register} watch={watch} />
                <EngineType register={register} watch={watch} />
                <EngineСapacity register={register} watch={watch} />
                <DriveType register={register} watch={watch} />
                <YearOfProduction register={register} watch={watch} />
                <TransmissionType register={register} watch={watch} />
                <BodyTypeOfTransport register={register} watch={watch} />
                <ConditionOfTransport register={register} watch={watch} />
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
