import { SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import {
    FoodDelivery,
    FoodEstablishment,
    FoodType,
} from 'features/settingCategoryForm/settingFoodForm';
import { Reset } from 'shared/ui/icons/icons-tools/Reset.tsx';
import { TypeForFoodForm } from './libr/TypeForFoodForm';
import { searchParamsForFood } from './libr/searchParamsForFood';
import { useTranslation } from 'react-i18next';
import { scrollToTop } from 'shared/utils/scrollToTop.ts';
import styles from './libr/settingFoordForm.module.scss';
import stylesForm from 'widgets/settingForm/forms/filtersForm.module.scss';
import { useGetAvailableFiltersQuery, useGetFiltersQuery } from 'app/api/fetchAdverts';
import { getDefaultValues } from './libr/getDefaultValues';
import { District } from 'features/settingCategoryForm/settingFoodForm/District';
import { StickyButton } from 'entity/stickyButton/StickyButton';
import { getLightFiltersQuery } from 'shared/utils/getLightFiltersQuery';
import { PriceFilter } from 'entity/priceFilter/PriceFilter';
import { CityFilter } from 'entity/cityFilter/CityFilter';

interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

const SettingFoodForm = ({ setShowFilters }: Props) => {
    const { t } = useTranslation();

    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
    };
    const [searchParams, setSearchParams] = useSearchParams();
    const { data } = useGetFiltersQuery('');
    const defaultValues = getDefaultValues(searchParams, data);

    const { register, handleSubmit, reset, setValue, control, watch } =
        useForm<TypeForFoodForm>({ defaultValues });

    const onsubmit: SubmitHandler<TypeForFoodForm> = (data) => {
        const { city, food_delivery, food_establishment, food_type, price } = data;

        const { foodCity, delivery, establishment, type, priceMaxQuery, priceMinQuery } = searchParamsForFood(
            city,
            food_delivery,
            food_establishment,
            food_type,
            price,
        );
        setSearchParams(
            `category=food${foodCity}${type}${delivery}${establishment}${priceMaxQuery}${priceMinQuery}&page=1`
        );

        setShowFilters(false);
        scrollToTop();
    };

    const handleReset = () => {
        reset();
        setSearchParams('category=food&page=1');
        location.reload();
    };

    const query = getLightFiltersQuery({
        filters: ['region', 'city', 'excursion_food', 'excursion_transfer', 'price'],
        watch,
    });
    const category = searchParams.get('category');
    const { data: availableData } = useGetAvailableFiltersQuery(`?category=${category}&${query}`);

    return (
        <section className={stylesForm.filters} onClick={handleClick}>
            <form
                className={styles.filterFoodForm}
                onSubmit={handleSubmit(onsubmit)}
                id="form-setting-food"
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
                <FoodType
                    control={control}
                    setValue={setValue}
                    available_params={availableData?.available_params.food_type}
                />
                <FoodDelivery register={register} />
                <FoodEstablishment register={register} />
                <PriceFilter
                    register={register}
                    available_params={availableData?.available_params.price}
                />
                {availableData && <StickyButton count={availableData.count} />}
                <button
                    className={`${stylesForm.reset_setting_form} ${styles.reset_setting_form}`}
                    onClick={handleReset}
                >
                    <Reset color="#1F6FDE" />
                    {t('filters.reset')}
                </button>
            </form>
        </section>
    );
};

export default SettingFoodForm;
