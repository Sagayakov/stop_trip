import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
    Bathroom,
    LivingSpace,
    RealtyComission,
    RoomsQuantity,
    SettingPrice,
    TotalArea,
} from '../../../features/settingCategoryForm/settingRealtyForm';
import { TypeOfProperty } from '../../../features/settingCategoryForm/settingRealtyForm/TypeOfProperty';
import { Reset } from '../../../shared/ui/icons/icons-tools/Reset';
import { TypeSettingRealty } from './TypeSettingRealty';

interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

export const SettingRealtyForm = ({ setShowFilters }: Props) => {
    const [showDropDown, setShowDropDown] = useState<boolean>(false);
    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
        setShowDropDown(false);
    };

    const { register, handleSubmit, reset, watch } =
        useForm<TypeSettingRealty>();

    const onsubmit: SubmitHandler<TypeSettingRealty> = (data) => {
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
                className="filter-realty-form"
                onSubmit={handleSubmit(onsubmit)}
            >
                <TypeOfProperty
                    watch={watch}
                    register={register}
                    showDropDown={showDropDown}
                    setShowDropDown={setShowDropDown}
                />
                <SettingPrice register={register} watch={watch} />
                <TotalArea register={register} />
                <LivingSpace register={register} />
                <div className="checkboxes">
                    <RoomsQuantity register={register} />
                    <Bathroom register={register} />
                    <label className="form-checkbox balcony">
                        <input type="checkbox" {...register('balcony')} />
                        <span>Балкон</span>
                    </label>
                    <label className="form-checkbox only-with-photo">
                        <input
                            type="checkbox"
                            {...register('onlyWithPhotos')}
                        />
                        <span>Только с фотографиями</span>
                    </label>
                </div>
                <RealtyComission register={register}/>
                <input type="submit" value="Показать 100 объявлений" />
                <button className="reset-setting-form" onClick={onReset}>
                    <Reset color="#1F6FDE" />
                    Сбросить фильтры
                </button>
            </form>
        </section>
    );
};
