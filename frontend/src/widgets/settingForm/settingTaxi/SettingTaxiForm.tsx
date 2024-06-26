import { SubmitHandler, useForm } from 'react-hook-form';
import { TypeOfTaxi, UnitOfMeasurement } from 'features/settingCategoryForm/settingTaxiForm';
import { Reset } from 'shared/ui/icons/icons-tools/Reset.tsx';
import { TypeSettingTaxi } from './libr/TypeSettingTaxi';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getSearchParams } from 'widgets/settingForm/settingTaxi/libr/getSearchParams.ts';
import { scrollToTop } from 'shared/utils/scrollToTop.ts';
import styles from './libr/settingTaxiForm.module.scss';
import formStyles from 'widgets/settingForm/forms/filtersForm.module.scss';
import { useGetAvailableFiltersQuery, useGetFiltersQuery } from 'app/api/fetchAdverts';
import { getDefaultValues } from './libr/getDefaultValues';
import { District } from 'features/settingCategoryForm/settingTaxiForm/District';
import { StickyButton } from 'entity/stickyButton/StickyButton';
import { getLightFiltersQuery } from 'shared/utils/getLightFiltersQuery';
import { PriceFilter } from 'entity/priceFilter/PriceFilter';
import { CityFilter } from 'entity/cityFilter/CityFilter';

interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

const SettingTaxiForm = ({ setShowFilters }: Props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { t } = useTranslation();
    const { data } = useGetFiltersQuery('');
    const defaultValues = getDefaultValues(searchParams, data);

    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
    };

    const { register, handleSubmit, reset, setValue, control, watch } =
        useForm<TypeSettingTaxi>({ defaultValues });

    const onsubmit: SubmitHandler<TypeSettingTaxi> = (data) => {
        const { city, taxi_unit, taxi_type, price } = data;
        const filters = getSearchParams({ city, taxi_type, taxi_unit, price });
        setSearchParams(`category=taxi${filters}&page=1`);
        scrollToTop();
        setShowFilters(false);
    };

    const handleReset = () => {
        reset();
        setSearchParams('category=taxi&page=1');
        location.reload();
    };

    const query = getLightFiltersQuery({
        filters: ['region', 'city', 'service_home_visit', 'price'],
        watch,
    });
    const category = searchParams.get('category');
    const { data: availableData } = useGetAvailableFiltersQuery(`?category=${category}&${query}`);

    return (
        <section className={formStyles.filters} onClick={handleClick}>
            <form
                className={styles.filterTaxiForm}
                onSubmit={handleSubmit(onsubmit)}
                autoComplete="off"
                id="form-setting-taxi"
            >
                <District
                    control={control}
                    setValue={setValue}
                    available_params={availableData?.available_params.region}
                />
                <CityFilter
                    control={control}
                    setValue={setValue}
                    available_params={availableData?.available_params.city}
                />
                <UnitOfMeasurement register={register} />
                <TypeOfTaxi
                    control={control}
                    setValue={setValue}
                    available_params={availableData?.available_params.city}
                />
                <PriceFilter
                    register={register}
                    available_params={availableData?.available_params.city}
                />
                {availableData && <StickyButton count={availableData.count} />}
                <button
                    className={`${formStyles.reset_setting_form} ${styles.reset_setting_form}`}
                    onClick={handleReset}
                >
                    <Reset color="#1F6FDE" />
                    {t('filters.reset')}
                </button>
            </form>
        </section>
    );
};

export default SettingTaxiForm;
