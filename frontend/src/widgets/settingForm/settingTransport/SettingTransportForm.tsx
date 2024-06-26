import { SubmitHandler, useForm } from 'react-hook-form';
import {
    BodyTypeOfTransport,
    ConditionOfTransport,
    DriveType,
    EngineType,
    EngineCapacity,
    MarkOfTransport,
    ModelOfTransport,
    TransmissionType,
    TransportCommission,
    TransportationCategory,
    TypeOfService,
    TypeOfTransport,
    YearOfProduction,
} from 'features/settingCategoryForm/settingTransportForm';
import { Reset } from 'shared/ui/icons/icons-tools/Reset.tsx';
import { TypeSettingTransport } from './libr/TypeSettingTransport';
import { useSearchParams } from 'react-router-dom';
import { getTransportQuery } from 'shared/utils/getTransportQuery.ts';
import { useTranslation } from 'react-i18next';
import { UniversalButton } from 'entity/universalEntites';
import { scrollToTop } from 'shared/utils/scrollToTop.ts';
import styles from './libr/settingTransportForm.module.scss';
import formStyle from 'widgets/settingForm/forms/filtersForm.module.scss';
import { useGetAvailableFiltersQuery, useGetFiltersQuery } from 'app/api/fetchAdverts';
import { getDefaultValues } from './libr/getDefaultValues';
import { StickyButton } from 'entity/stickyButton/StickyButton';
import { getLightFiltersQuery } from 'shared/utils/getLightFiltersQuery';
import { PriceFilter } from 'entity/priceFilter/PriceFilter';
import { CityFilter } from 'entity/cityFilter/CityFilter';
import { RegionFilter } from 'entity/regionFilter/RegionFilter';

interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

const SettingTransportForm = ({ setShowFilters }: Props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { t } = useTranslation();
    const { data } = useGetFiltersQuery('');
    const defaultValues = getDefaultValues(searchParams, data);

    const { register, handleSubmit, reset, watch, setValue, control } =
        useForm<TypeSettingTransport>({ defaultValues });

    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
    };

    const onsubmit: SubmitHandler<TypeSettingTransport> = (data) => {
        const filters = getTransportQuery(data);
        setSearchParams(`category=transport${filters}&page=1`);
        setShowFilters(false);
        scrollToTop();
    };

    const handleReset = () => {
        reset();
        setSearchParams('category=transport&page=1');
        location.reload();
    };

    const query = getLightFiltersQuery({
        filters: [
            'region',
            'city',
            'transport_type_of_service',
            'transport_type',
            'transport_category',
            'transport_brand',
            'transport_model',
            'transport_engine_type',
            'transport_engine_volume',
            'transport_drive_type',
            'transport_year_of_production',
            'transport_transmission_type',
            'transport_body_type',
            'transport_condition',
            'transport_commission',
            'price',
        ],
        watch,
    });
    const category = searchParams.get('category');
    const { data: availableData } = useGetAvailableFiltersQuery(`?category=${category}&${query}`);

    return (
        <section className={formStyle.filters} onClick={handleClick}>
            <form
                className={styles.filter_transport_form}
                onSubmit={handleSubmit(onsubmit)}
                autoComplete="off"
                id="form-setting-transport"
            >
                <TypeOfService register={register} />
                <RegionFilter
                    control={control}
                    setValue={setValue}
                    available_params={availableData?.available_params.region}
                />
                <CityFilter
                    control={control}
                    setValue={setValue}
                    available_params={availableData?.available_params.city}
                />
                <TypeOfTransport register={register} watch={watch} />
                <TransportationCategory
                    setValue={setValue}
                    control={control}
                    available_params={availableData?.available_params.transport_category}
                />
                <MarkOfTransport
                    setValue={setValue}
                    control={control}
                    available_params={availableData?.available_params.transport_brand}
                />
                <ModelOfTransport
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    control={control}
                    available_params={availableData?.available_params.transport_model}
                />
                <EngineType
                    setValue={setValue}
                    control={control}
                    available_params={availableData?.available_params.transport_engine_type}
                />
                <EngineCapacity
                    register={register}
                    available_params={availableData?.available_params.transport_engine_volume}
                />
                <DriveType
                    setValue={setValue}
                    control={control}
                    available_params={availableData?.available_params.transport_drive_type}
                />
                <YearOfProduction
                    register={register}
                    available_params={availableData?.available_params.transport_year_of_production}
                />
                <TransmissionType
                    control={control}
                    setValue={setValue}
                    available_params={availableData?.available_params.transport_transmission_type}
                />
                <BodyTypeOfTransport
                    setValue={setValue}
                    control={control}
                    available_params={availableData?.available_params.transport_body_type}
                />
                <ConditionOfTransport
                    control={control}
                    setValue={setValue}
                    available_params={availableData?.available_params.transport_condition}
                />
                <TransportCommission
                    register={register}
                    available_params={availableData?.available_params.transport_commission}
                />
                <PriceFilter
                    register={register}
                    available_params={availableData?.available_params.price}
                />
                {availableData && <StickyButton count={availableData.count} />}
                <UniversalButton
                    onClick={handleReset}
                    className={`${formStyle.reset_setting_form} ${styles.reset_setting_form}`}
                >
                    <Reset color="#1F6FDE" />
                    {t('filters.reset')}
                </UniversalButton>
            </form>
        </section>
    );
};

export default SettingTransportForm;
