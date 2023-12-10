import { SubmitHandler, useForm } from 'react-hook-form';
import {
    ExchangeFor,
    ExchangeRate,
    ProposedCurrency,
} from '../../../features/settingCategoryForm/settingCurrencyForm';
import { Reset } from '../../../shared/ui/icons/icons-tools/Reset';
import { TypeOfCurrencyFilter } from './libr/TypeOfCurrencyFilter';
import './libr/settingCurrencyFilter.scss';

interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

const SettingCurrencyForm = ({ setShowFilters }: Props) => {
    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
    };

    const { handleSubmit, reset, control, setValue, register } =
        useForm<TypeOfCurrencyFilter>();

    const onSubmit: SubmitHandler<TypeOfCurrencyFilter> = (data) => {
        console.log(data);
        setShowFilters(false);
        reset();
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
                <input type="submit" value="Применить" />
                <button className="reset-setting-form" onClick={onReset}>
                    <Reset color="#1F6FDE" />
                    Сбросить фильтры
                </button>
            </form>
        </section>
    );
};

export default SettingCurrencyForm;
