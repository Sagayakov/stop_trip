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
import { useGetFiltersQuery } from 'app/api/fetchAdverts';
import { getDefaultValues } from './libr/getDefaultValues';

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

    return (
        <section className={formStyles.filters} onClick={handleClick}>
            <form
                className={styles.filter_realty_form}
                onSubmit={handleSubmit(onsubmit)}
                id="form-setting-property"
            >
                <TypeOfService register={register} />
                <District control={control} setValue={setValue} />
                <City control={control} setValue={setValue} watch={watch} />
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
                <Amenities register={register} />
                <RoomsQuantity register={register} />
                <Bathroom register={register} />
                <BathroomQuantity register={register} />
                <HasParking register={register} />
                <Prepayment control={control} setValue={setValue} />
                <RealtyCommission register={register} />
                <input type="submit" value={t('filters.apply')} />
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
