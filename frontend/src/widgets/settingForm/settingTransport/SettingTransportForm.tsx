import { SubmitHandler, useForm } from 'react-hook-form';
import {
    BodyTypeOfTransport,
    ConditionOfTransport,
    DriveType,
    EngineType,
    EngineСapacity,
    MarkOfTransport,
    ModelOfTransport,
    SettingTransportPrice,
    TransmissionType,
    TransportComission,
    TransportationCategory,
    TypeOfService,
    TypeOfTransport,
    YearOfProduction,
} from '../../../features/settingCategoryForm/settingTransportForm/index';
import { Reset } from '../../../shared/ui/icons/icons-tools/Reset';
import '././libr/settingTransportForm.scss';
import { TypeSettingTransport } from './libr/TypeSettingTransport';

interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

export const SettingTransportForm = ({ setShowFilters }: Props) => {
    const { register, handleSubmit, reset, watch, setValue, control } =
        useForm<TypeSettingTransport>();
    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
    };

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
            <form
                className="filter-transport-form"
                onSubmit={handleSubmit(onsubmit)}
                autoComplete="off"
            >
                <TypeOfService register={register} watch={watch} />
                <TypeOfTransport register={register} watch={watch} />
                <TransportationCategory setValue={setValue} control={control} />
                <MarkOfTransport setValue={setValue} control={control} />
                <ModelOfTransport
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    control={control}
                />
                <EngineType setValue={setValue} control={control} />
                <EngineСapacity register={register} />
                <DriveType register={register} setValue={setValue} />
                <YearOfProduction register={register} />
                <TransmissionType register={register} />
                <BodyTypeOfTransport setValue={setValue} control={control} />
                <ConditionOfTransport register={register} setValue={setValue} />
                <TransportComission register={register} />
                <SettingTransportPrice register={register}/>
                <input type="submit" value="Применить" />
                <button className="reset-setting-form" onClick={onReset}>
                    <Reset color="#1F6FDE" />
                    Сбросить фильтры
                </button>
            </form>
        </section>
    );
};
