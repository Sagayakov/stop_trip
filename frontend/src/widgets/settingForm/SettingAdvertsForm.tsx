import { SubmitHandler, useForm } from 'react-hook-form';
import {
    Bathroom,
    LivingSpace,
    RoomsQuantity,
    SettingPrice,
    TotalArea,
} from '../../features/settingAdvertsForm';
import { TypeOfProperty } from '../../features/settingAdvertsForm/TypeOfProperty';
import { Reset } from '../../shared/ui/icons/icons-tools/Reset';
import { TypeSettingAdverts } from './TypeSettingAdverts';
import { useState } from 'react';

interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

export const SettingAdvertsForm = ({ setShowFilters }: Props) => {
    const [showDropDown, setShowDropDown] = useState<boolean>(false);
    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
        setShowDropDown(false);
    };

    const { register, handleSubmit, reset, watch } =
        useForm<TypeSettingAdverts>();

    const onsubmit: SubmitHandler<TypeSettingAdverts> = (data) => {
        console.log(data);
        setShowFilters(false);
        reset();
    };

    const onReset = () => {
        reset();
    };

    return (
        <section
            className="filters"
            onClick={handleClick}
        >
            <form
                onSubmit={handleSubmit(onsubmit)}
                onClick={(event) => event.stopPropagation()}//попробовать, чтобы на мобильном не закрывались фильтры при скролле 24.10.2024
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
                <input type="submit" value="Показать 100 объявлений" />
                <button className="reset-setting-form" onClick={onReset}>
                    <Reset color="#1F6FDE" />
                    Сбросить фильтры
                </button>
            </form>
        </section>
    );
};