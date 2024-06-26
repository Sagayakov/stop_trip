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
    PropertyType,
} from 'features/settingCategoryForm/settingRealtyForm';
import { Reset } from 'shared/ui/icons/icons-tools/Reset.tsx';
import { TypeSettingRealty } from './libr/TypeSettingRealty';
import { useSearchParams } from 'react-router-dom';
import { getRealtyQuery } from 'shared/utils/getRealtyQuery.ts';
import { useTranslation } from 'react-i18next';
import { UniversalButton } from 'entity/universalEntites';
import { scrollToTop } from 'shared/utils/scrollToTop.ts';
import styles from './libr/settingRealty.module.scss';
import formStyles from 'widgets/settingForm/forms/filtersForm.module.scss';
import { useGetAvailableFiltersQuery, useGetFiltersQuery } from 'app/api/fetchAdverts';
import { getDefaultValues } from './libr/getDefaultValues';
import { StickyButton } from 'entity/stickyButton/StickyButton';
import { getLightFiltersQuery } from 'shared/utils/getLightFiltersQuery';

interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

const SettingRealtyForm = ({ setShowFilters }: Props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { t } = useTranslation();
    const { data } = useGetFiltersQuery('');
    const defaultValues = getDefaultValues(searchParams, data);

    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
    };

    const { register, handleSubmit, reset, watch, setValue, control } =
        useForm<TypeSettingRealty>({ defaultValues });

    const onsubmit: SubmitHandler<TypeSettingRealty> = (data) => {
        const filters = getRealtyQuery(data);
        setSearchParams(`category=property${filters}&page=1`);
        setShowFilters(false);
        scrollToTop();
    };

    const handleReset = () => {
        reset();
        setSearchParams('category=property&page=1');
        location.reload();
    };

    const query = getLightFiltersQuery({
        filters: [
            'region',
            'city',
            'property_type_of_service',
            'property_house_type',
            'property_floor',
            'property_rental_condition',
            'price',
            'property_type',
            'property_area',
            'property_living_area',
            'property_sleeping_places',
            'property_has_furniture',
            'property_amenities',
            'property_rooms_count',
            'property_bathroom_type',
            'property_bathroom_count',
            'property_balcony',
            'property_has_parking',
            'property_commission',
            'property_prepayment',
        ],
        watch,
    });
    const category = searchParams.get('category');
    const { data: availableData } = useGetAvailableFiltersQuery(`?category=${category}&${query}`);

    return (
        <section className={formStyles.filters} onClick={handleClick}>
            <form
                className={styles.filter_realty_form}
                onSubmit={handleSubmit(onsubmit)}
                id="form-setting-property"
            >
                <TypeOfService register={register} />
                <District
                    control={control}
                    setValue={setValue}
                    available_params={availableData?.available_params.region}
                />
                <City
                    control={control}
                    setValue={setValue}
                    available_params={availableData?.available_params.city}
                />
                <HouseType
                    control={control}
                    setValue={setValue}
                    available_params={availableData?.available_params.property_house_type}
                />
                <PropertyType
                    setValue={setValue}
                    control={control}
                    available_params={availableData?.available_params.property_type}
                />
                <SettingPrice
                    register={register}
                    watch={watch}
                    available_params={availableData?.available_params.price}
                />
                <RentalCondition
                    control={control}
                    setValue={setValue}
                    available_params={availableData?.available_params.property_rental_condition}
                />
                <TotalArea
                    register={register}
                    available_params={availableData?.available_params.property_area}
                />
                <LivingSpace
                    register={register}
                    available_params={availableData?.available_params.property_living_area}
                />
                <Floor register={register} />
                <SleepingPlaces
                    register={register}
                    available_params={availableData?.available_params.property_sleeping_places}
                />
                <Balcony register={register} />
                <HasFurniture register={register} />
                <Amenities register={register} />
                <RoomsQuantity
                    register={register}
                    available_params={availableData?.available_params.property_rooms_count}
                />
                <Bathroom register={register} />
                <BathroomQuantity
                    register={register}
                    available_params={availableData?.available_params.property_bathroom_count}
                />
                <HasParking register={register} />
                <Prepayment
                    control={control}
                    setValue={setValue}
                    available_params={availableData?.available_params.property_prepayment}
                />
                <RealtyCommission
                    register={register}
                    available_params={availableData?.available_params.property_commission}
                />
                {availableData && <StickyButton count={availableData.count} />}
                <UniversalButton
                    className={`${formStyles.reset_setting_form} ${styles.reset_setting_form}`}
                    onClick={handleReset}
                >
                    <Reset color="#1F6FDE" />
                    {t('filters.reset')}
                </UniversalButton>
            </form>
        </section>
    );
};

export default SettingRealtyForm;
