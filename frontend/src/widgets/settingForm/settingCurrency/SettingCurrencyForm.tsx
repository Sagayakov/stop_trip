import { SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import {
    City,
    ExchangeFor,
    ExchangeRate,
    ProposedCurrency,
} from 'features/settingCategoryForm/settingCurrencyForm';
import { Reset } from 'shared/ui/icons/icons-tools/Reset.tsx';
import { TypeOfCurrencyFilter } from './libr/TypeOfCurrencyFilter';
import { useTranslation } from 'react-i18next';
import { scrollToTop } from 'shared/utils/scrollToTop';
import styles from 'widgets/settingForm/forms/filtersForm.module.scss';
import formStyles from './libr/settingCurrencyFilter.module.scss';
import { searchParamsForExchange } from './libr/searchParamsForExchange';
import { useGetAvailableFiltersQuery, useGetFiltersQuery } from 'app/api/fetchAdverts';
import { getDefaultValues } from './libr/getDefaultValues';
import { District } from 'features/settingCategoryForm/settingCurrencyForm/District';
import { StickyButton } from 'entity/stickyButton/StickyButton';
import { getLightFiltersQuery } from 'shared/utils/getLightFiltersQuery';

interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

const SettingCurrencyForm = ({ setShowFilters }: Props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
    };
    const { t } = useTranslation();
    const { data } = useGetFiltersQuery('');
    const defaultValues = getDefaultValues(searchParams, data);

    const { handleSubmit, reset, control, setValue, register, watch } =
        useForm<TypeOfCurrencyFilter>({
            defaultValues,
        });

    const onSubmit: SubmitHandler<TypeOfCurrencyFilter> = (data) => {
        const { city, exchange_for, exchange_rate, proposed_currency } = data;

        const { currencyCity, exFor, proposed, rateMax, rateMin } = searchParamsForExchange(
            {
                city,
                exchange_for,
                exchange_rate,
                proposed_currency,
            }
        );

        setSearchParams(
            `category=exchange_rate${currencyCity}${proposed}${exFor}${rateMin}${rateMax}&page=1`
        );

        setShowFilters(false);
        scrollToTop();
    };

    const handleReset = () => {
        reset();
        setSearchParams('category=exchange_rate&page=1');
        location.reload();
    };

    const query = getLightFiltersQuery({
        filters: ['region', 'city', 'exchange_for', 'exchange_rate', 'proposed_currency'],
        watch,
    });
    const category = searchParams.get('category');
    const { data: availableData } = useGetAvailableFiltersQuery(`?category=${category}&${query}`);

    return (
        <section className={styles.filters} onClick={handleClick}>
            <form
                className={formStyles.filterCurrencyForm}
                onSubmit={handleSubmit(onSubmit)}
                id="form-setting-currency"
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
                <ProposedCurrency
                    control={control}
                    setValue={setValue}
                    available_params={availableData?.available_params.proposed_currency}
                />
                <ExchangeFor
                    control={control}
                    setValue={setValue}
                    available_params={availableData?.available_params.exchange_for}
                />
                <ExchangeRate
                    register={register}
                    available_params={availableData?.available_params.exchange_rate}
                />
                {availableData && <StickyButton count={availableData.count} />}
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

export default SettingCurrencyForm;
