import { SubmitHandler, useForm } from 'react-hook-form';
import {
    Amenities,
    Bathroom,
    BathroomQuantity,
    City,
    District,
    HasFurniture,
    HouseType,
    RealtyComission,
    RentalCondition,
    RoomsQuantity,
    SettingPrice,
    SleepingPlaces,
    TotalArea,
    TypeOfService,
} from '../../../features/settingCategoryForm/settingRealtyForm';
import { Reset } from '../../../shared/ui/icons/icons-tools/Reset';
import { TypeSettingRealty } from './libr/TypeSettingRealty';
import './libr/settingRealty.scss'
interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

export const SettingRealtyForm = ({ setShowFilters }: Props) => {
    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
    };

    const { register, handleSubmit, reset, watch, setValue, control } =
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
                <TypeOfService control={control} setValue={setValue}/>
                <City control={control} setValue={setValue}/>
                <District control={control} setValue={setValue}/>
                {/* <TypeOfProperty control={control} setValue={setValue} /> не нужно*/}
                <HouseType control={control} setValue={setValue}/>
                <SettingPrice register={register} watch={watch} />
                <RentalCondition control={control} setValue={setValue}/>
                <TotalArea register={register} />
                <SleepingPlaces register={register}/>
                <HasFurniture register={register}/>
                <Amenities register={register}/>
                {/* <div className="checkboxes"> */}
                    <RoomsQuantity register={register} />
                    <Bathroom register={register} />
                    <BathroomQuantity register={register}/>
                {/* </div> */}
                <RealtyComission register={register} />
                <input type="submit" value="Показать 100 объявлений" />
                <button className="reset-setting-form" onClick={onReset}>
                    <Reset color="#1F6FDE" />
                    Сбросить фильтры
                </button>
            </form>
        </section>
    );
};
