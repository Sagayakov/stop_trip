import { SubmitHandler, useForm } from 'react-hook-form';
import {
    City,
    ExcursionFood,
    ExcursionTransfer,
} from 'features/settingCategoryForm/settingExcursionForm';
import { Reset } from 'shared/ui/icons/icons-tools/Reset.tsx';
import { TypeForExcursionFilter } from './libr/TypeForExcursionFilter';
import { useTranslation } from 'react-i18next';
import styles from './libr/settingExcursionFilter.module.scss';
import { scrollToTop } from 'shared/utils/scrollToTop.ts';
import formStyles from 'widgets/settingForm/forms/filtersForm.module.scss';
import { getSearchParams } from './libr/getSearchParams';
import { useSearchParams } from 'react-router-dom';
import { useGetAvailableFiltersQuery, useGetFiltersQuery } from 'app/api/fetchAdverts';
import { getDefaultValues } from './libr/getDefaultValues';
import { District } from 'features/settingCategoryForm/settingExcursionForm/District';
import { StickyButton } from 'features/stickyButton/StickyButton';
import { ExcursionPrice } from 'features/settingCategoryForm/settingExcursionForm/ExcursionPrice';
import { getLightFiltersQuery } from 'shared/utils/getLightFiltersQuery';

interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

const SettingExcursionForm = ({ setShowFilters }: Props) => {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    const { data } = useGetFiltersQuery('');
    const defaultValues = getDefaultValues(searchParams, data);

    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
    };

    const { handleSubmit, reset, register, control, setValue, watch } =
        useForm<TypeForExcursionFilter>({ defaultValues });

    const onSubmit: SubmitHandler<TypeForExcursionFilter> = (data) => {
        const { city, excursion_food, excursion_transfer, price } = data;

        const filters = getSearchParams(
            city,
            excursion_food,
            excursion_transfer,
            price
        );

        setSearchParams(`category=excursion${filters}&page=1`);
        setShowFilters(false);
        scrollToTop();
    };

    const handleReset = () => {
        reset();
        setSearchParams('category=excursion&page=1');
        location.reload();
    };

    const query = getLightFiltersQuery({
        filters: ['region', 'city', 'excursion_food', 'excursion_transfer', 'price'],
        watch,
    });
    const category = searchParams.get('category');
    const { data: availableData } = useGetAvailableFiltersQuery(`?category=${category}&${query}`);

    return (
        <section className={formStyles.filters} onClick={handleClick}>
            <form
                className={styles.filterExcursionForm}
                onSubmit={handleSubmit(onSubmit)}
                id="form-setting-excursion"
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
                <ExcursionFood register={register} />
                <ExcursionTransfer register={register} />
                <ExcursionPrice
                    register={register}
                    available_params={availableData?.available_params.price}
                />
                <StickyButton count={availableData?.count} />
                <button
                    className={`${styles.reset_setting_form} ${formStyles.reset_setting_form}`}
                    onClick={handleReset}
                >
                    <Reset color="#1F6FDE" />
                    {t('filters.reset')}
                </button>
            </form>
        </section>
    );
};

export default SettingExcursionForm;
