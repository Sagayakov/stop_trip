import { SubmitHandler, useForm } from 'react-hook-form';
import {
    SettingTaxiPrice,
    TypeOfTaxi,
    UnitOfMeasurement,
} from '../../../features/settingCategoryForm/settingTaxiForm/index';
import { Reset } from '../../../shared/ui/icons/icons-tools/Reset';
import { TypeSettingTaxi } from './libr/TypeSettingTaxi';
import './libr/settingTaxiForm.scss'

interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

export const SettingTaxiForm = ({ setShowFilters }: Props) => {
    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
    };

    const { register, handleSubmit, reset, setValue, control } =
        useForm<TypeSettingTaxi>();

    const onsubmit: SubmitHandler<TypeSettingTaxi> = (data) => {
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
                className="filterTaxiForm"
                onSubmit={handleSubmit(onsubmit)}
                autoComplete="off"
            >
                <UnitOfMeasurement control={control} setValue={setValue} />
                <TypeOfTaxi control={control} setValue={setValue} />
                <SettingTaxiPrice register={register} />
                <input type="submit" value="Показать 100 объявлений" />
                <button className="reset-setting-form" onClick={onReset}>
                    <Reset color="#1F6FDE" />
                    Сбросить фильтры
                </button>
            </form>
        </section>
    );
};
