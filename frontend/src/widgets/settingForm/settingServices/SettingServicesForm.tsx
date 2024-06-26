import { SubmitHandler, useForm } from 'react-hook-form';
import { City, HouseCall } from 'features/settingCategoryForm/settingServices';
import { Reset } from 'shared/ui/icons/icons-tools/Reset.tsx';
import { TypeOfServicesForm } from './libr/TypeOfServicesForm';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getSearchParams } from './libr/getSearchParams.ts';
import { scrollToTop } from 'shared/utils/scrollToTop.ts';
import styles from './libr/settingServicesForm.module.scss';
import formStyles from 'widgets/settingForm/forms/filtersForm.module.scss';
import { useGetAvailableFiltersQuery, useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { getDefaultValues } from './libr/getDefaultValues.ts';
import { District } from 'features/settingCategoryForm/settingServices/District.tsx';
import { StickyButton } from 'entity/stickyButton/StickyButton.tsx';
import { getLightFiltersQuery } from 'shared/utils/getLightFiltersQuery.ts';
import { PriceFilter } from 'entity/priceFilter/PriceFilter.tsx';

interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

const SettingServicesForm = ({ setShowFilters }: Props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { t } = useTranslation();
    const { data } = useGetFiltersQuery('');
    const defaultValues = getDefaultValues(searchParams, data);

    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
    };

    const { register, handleSubmit, reset, setValue, control, watch } =
        useForm<TypeOfServicesForm>({ defaultValues });

    const onsubmit: SubmitHandler<TypeOfServicesForm> = (data) => {
        const { city, service_home_visit, price } = data;
        const filters = getSearchParams(city, service_home_visit, price);
        setSearchParams(`category=service${filters}&page=1`);
        setShowFilters(false);
        scrollToTop();
    };

    const handleReset = () => {
        reset();
        setSearchParams('category=service&page=1');
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
                className={styles.filterServiceForm}
                onSubmit={handleSubmit(onsubmit)}
                autoComplete="off"
                id="form-setting-service"
            >
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
                <HouseCall register={register} />
                <PriceFilter
                    register={register}
                    available_params={availableData?.available_params.price}
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

export default SettingServicesForm;
