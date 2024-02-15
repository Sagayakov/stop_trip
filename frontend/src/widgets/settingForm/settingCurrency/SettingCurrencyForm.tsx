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
import { useGetFiltersQuery } from 'app/api/fetchAdverts';
import { getDefaultValues } from './libr/getDefaultValues';

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

    const { handleSubmit, reset, control, setValue, register } =
        useForm<TypeOfCurrencyFilter>({
            defaultValues,
        });

    const onSubmit: SubmitHandler<TypeOfCurrencyFilter> = (data) => {
        const { city, exchange_for, exchange_rate, proposed_currency } = data;

        const { currencyCity, exFor, proposed, rate } = searchParamsForExchange(
            {
                city,
                exchange_for,
                exchange_rate,
                proposed_currency,
            }
        );

        setSearchParams(
            `category=exchange_rate${currencyCity}${proposed}${exFor}${rate}&page=1`
        );

        setShowFilters(false);
        scrollToTop();
    };

    const handleReset = () => {
        reset();
        setSearchParams('category=exchange_rate&page=1');
        location.reload();
    };

    return (
        <section className={styles.filters} onClick={handleClick}>
            <form
                className={formStyles.filterCurrencyForm}
                onSubmit={handleSubmit(onSubmit)}
                id="form-setting-currency"
            >
                <City control={control} setValue={setValue} />
                <ProposedCurrency control={control} setValue={setValue} />
                <ExchangeFor control={control} setValue={setValue} />
                <ExchangeRate register={register} />
                <input type="submit" value={t('filters.apply')} />
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
