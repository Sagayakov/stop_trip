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
    Floor, PropertyType,
} from 'features/settingCategoryForm/settingRealtyForm';
import { Reset } from 'shared/ui/icons/icons-tools/Reset.tsx';
import { TypeSettingRealty } from './libr/TypeSettingRealty';
import './libr/settingRealty.scss';
import { useSearchParams } from 'react-router-dom';
import { getRealtyQuery } from 'shared/utils/getRealtyQuery.ts';
import { useTranslation } from 'react-i18next';
import { UniversalButton } from 'entities/universalEntites';
import { scrollToTop } from 'shared/utils/scrollToTop.ts';

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
        scrollToTop();
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
                <TypeOfService register={register} />
                <City control={control} setValue={setValue} />
                <District control={control} setValue={setValue} />
                <HouseType control={control} setValue={setValue} />
                <PropertyType setValue={setValue} control={control} />
                <SettingPrice register={register} watch={watch} />
                <RentalCondition control={control} setValue={setValue} />
                <TotalArea register={register} />
                <LivingSpace register={register} />
                <Floor register={register} />
                <SleepingPlaces register={register} />
                <Balcony register={register} />
                <HasFurniture register={register} />
                <Amenities setValue={setValue} control={control} />
                <RoomsQuantity register={register} />
                <Bathroom register={register} />
                <BathroomQuantity register={register} />
                <HasParking register={register} />
                <Prepayment control={control} setValue={setValue} />
                <RealtyCommission register={register} />
                <input type="submit" value={t('filters.apply')} />
                <UniversalButton className="reset-setting-form" onClick={onReset}>
                    <Reset color="#1F6FDE" />
                    {t('filters.reset')}
                </UniversalButton>
            </form>
        </section>
    );
};

export default SettingRealtyForm;
