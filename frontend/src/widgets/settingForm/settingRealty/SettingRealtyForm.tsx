import { SubmitHandler, useForm } from 'react-hook-form';
import {
    Amenities,
    Bathroom,
    BathroomQuantity,
    City,
    District,
    Balcony,
    HasFurniture,
    HouseType,
    RealtyCommission,
    RentalCondition,
    RoomsQuantity,
    SettingPrice,
    SleepingPlaces,
    TotalArea,
    TypeOfService,
    Prepayment,
    LivingSpace,
    HasParking,
    Floor,
} from '../../../features/settingCategoryForm/settingRealtyForm';
import { Reset } from '../../../shared/ui/icons/icons-tools/Reset';
import { TypeSettingRealty } from './libr/TypeSettingRealty';
import './libr/settingRealty.scss';
import { useSearchParams } from 'react-router-dom';
import { getRealtyQuery } from '../../../shared/utils/getRealtyQuery';
import { useTranslation } from 'react-i18next';

interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

const SettingRealtyForm = ({ setShowFilters }: Props) => {
    const [, setSearchParams] = useSearchParams();
    const { t } = useTranslation();

    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
    };

    const { register, handleSubmit, reset, watch, setValue, control } =
        useForm<TypeSettingRealty>();

    const onsubmit: SubmitHandler<TypeSettingRealty> = (data) => {
        const filters = getRealtyQuery(data);
        setSearchParams(`category=property${filters}`);
        setShowFilters(false);
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
                <TypeOfService control={control} setValue={setValue} register={register}/>
                <City control={control} setValue={setValue}/>
                <District control={control} setValue={setValue}/>
                {/* <TypeOfProperty control={control} setValue={setValue} /> не нужно*/}
                <HouseType control={control} setValue={setValue} />
                <SettingPrice register={register} watch={watch} />
                <RentalCondition control={control} setValue={setValue} />
                <TotalArea register={register} />
                <LivingSpace register={register} />
                <Floor register={register} />
                <SleepingPlaces register={register} />
                <Balcony register={register} />
                <HasFurniture register={register} />
                <Amenities register={register} />
                {/* <div className="checkboxes"> */}
                <RoomsQuantity register={register} />
                <Bathroom register={register} />
                <BathroomQuantity register={register} />
                {/* </div> */}
                <HasParking register={register} />
                <Prepayment control={control} setValue={setValue} />
                <RealtyCommission register={register} />
                <input type="submit" value={t('filters.apply')} />
                <button className="reset-setting-form" onClick={onReset}>
                    <Reset color="#1F6FDE" />
                    {t('filters.reset')}
                </button>
            </form>
        </section>
    );
};

export default SettingRealtyForm;
