import { SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import {
    ExchangeFor,
    ExchangeRate,
    ProposedCurrency,
} from 'features/settingCategoryForm/settingCurrencyForm';
import { Reset } from 'shared/ui/icons/icons-tools/Reset.tsx';
import { TypeOfCurrencyFilter } from './libr/TypeOfCurrencyFilter';
import { searchParamsForExchange } from './libr/searchParamsForExchange';
import { useTranslation } from 'react-i18next';
import { scrollToTop } from 'shared/utils/scrollToTop';
import styles from 'widgets/settingForm/forms/filtersForm.module.scss'
import formStyles from './libr/settingCurrencyFilter.module.scss'

interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

const SettingCurrencyForm = ({ setShowFilters }: Props) => {
    const [, setSearchParams] = useSearchParams();
    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
    };
    const { t } = useTranslation();

    const { handleSubmit, reset, control, setValue, register } =
        useForm<TypeOfCurrencyFilter>();

    const onSubmit: SubmitHandler<TypeOfCurrencyFilter> = (data) => {
        const { exchange_for, exchange_rate, proposed_currency } = data;

        const { exFor, proposed, rate } = searchParamsForExchange(
            exchange_for,
            exchange_rate,
            proposed_currency
        );

        setSearchParams(`category=exchange_rate${proposed}${exFor}${rate}`);

        setShowFilters(false);
        scrollToTop();
    };

    const onReset = () => reset();

    return (
        <section className={styles.filters} onClick={handleClick}>
            <form
                className={formStyles.filterCurrencyForm}
                onSubmit={handleSubmit(onSubmit)}
            >
                <ProposedCurrency control={control} setValue={setValue} />
                <ExchangeFor control={control} setValue={setValue} />
                <ExchangeRate register={register} />
                <input type="submit" value={t('filters.apply')} />
                <button className={`${styles.reset_setting_form} ${formStyles.reset_setting_form}`} onClick={onReset}>
                    <Reset color="#1F6FDE" />
                    {t('filters.reset')}
                </button>
            </form>
        </section>
    );
};

export default SettingCurrencyForm;
