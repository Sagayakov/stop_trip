import { SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import {
    ExchangeFor,
    ExchangeRate,
    ProposedCurrency,
} from '../../../features/settingCategoryForm/settingCurrencyForm';
import { Reset } from '../../../shared/ui/icons/icons-tools/Reset';
import { TypeOfCurrencyFilter } from './libr/TypeOfCurrencyFilter';
import { searchParamsForExchange } from './libr/searchParamsForExchange';
import './libr/settingCurrencyFilter.scss';
import { useTranslation } from 'react-i18next';

interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

const SettingCurrencyForm = ({ setShowFilters }: Props) => {
    const [, setSearchParams] = useSearchParams();
    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
    };
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <section className="filters" onClick={handleClick}>
            <form
                className="filterCurrencyForm"
                onSubmit={handleSubmit(onSubmit)}
            >
                <ProposedCurrency control={control} setValue={setValue} />
                <ExchangeFor control={control} setValue={setValue} />
                <ExchangeRate register={register} />
                <input type="submit" value={t('filters.apply')} />
                <button className="reset-setting-form" onClick={onReset}>
                    <Reset color="#1F6FDE" />
                    {t('filters.reset')}
                </button>
            </form>
        </section>
    );
};

export default SettingCurrencyForm;
