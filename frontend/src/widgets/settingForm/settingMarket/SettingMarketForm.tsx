import { SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import {
    City,
    MarketCondition,
} from 'features/settingCategoryForm/settingMarketForm';
import { Reset } from 'shared/ui/icons/icons-tools/Reset.tsx';
import { TypeForMarketForm } from './libr/TypeForMarketForm';
import styles from './libr/settingMarketForm.module.scss';
import stylesForm from 'widgets/settingForm/forms/filtersForm.module.scss';
import { useTranslation } from 'react-i18next';
import { scrollToTop } from 'shared/utils/scrollToTop.ts';
import { getMultiQuery } from 'shared/utils/getMultiQuery';
import { getDefaultValues } from './libr/getDefaultValues';
import { useGetAvailableFiltersQuery, useGetFiltersQuery } from 'app/api/fetchAdverts';
import { District } from 'features/settingCategoryForm/settingMarketForm/District';
import { StickyButton } from 'features/stickyButton/StickyButton';
import { MarketPrice } from 'features/settingCategoryForm/settingMarketForm/MarketPrice';
import { getLightFiltersQuery } from 'shared/utils/getLightFiltersQuery';

interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

const SettingMarketForm = ({ setShowFilters }: Props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { t } = useTranslation();
    const { data } = useGetFiltersQuery('');
    const defaultValues = getDefaultValues(searchParams, data);

    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
    };

    const { register, handleSubmit, reset, setValue, control, watch } =
        useForm<TypeForMarketForm>({ defaultValues });

    const onsubmit: SubmitHandler<TypeForMarketForm> = (data) => {
        const { city, market_condition, price } = data;

        const marketCity = getMultiQuery('city', city);
        const condition = market_condition
            ? `&market_condition=${market_condition}`
            : '';

        const priceMaxQuery = price.max
            ? `&price_max=${price.max.toString().replace(/,/g, '.')}`
            : '';
    
        const priceMinQuery = price.min
            ? `&price_min=${price.min.toString().replace(/,/g, '.')}`
            : '';

        setSearchParams(`category=market${marketCity}${condition}${priceMaxQuery}${priceMinQuery}&page=1`);
        setShowFilters(false);
        scrollToTop();
    };

    const handleReset = () => {
        reset();
        setSearchParams('category=market&page=1');
        location.reload();
    };

    const query = getLightFiltersQuery({
        filters: ['region', 'city', 'market_condition', 'price'],
        watch,
    });
    const category = searchParams.get('category');
    const { data: availableData } = useGetAvailableFiltersQuery(`?category=${category}&${query}`);

    return (
        <section className={stylesForm.filters} onClick={handleClick}>
            <form
                className={styles.filterFoodForm}
                onSubmit={handleSubmit(onsubmit)}
                id="form-setting-market"
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
                <MarketCondition register={register} />
                <MarketPrice
                    register={register}
                    available_params={availableData?.available_params.price}
                />
                <StickyButton count={availableData?.count} />
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

export default SettingMarketForm;
