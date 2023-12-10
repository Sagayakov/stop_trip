import { SubmitHandler, useForm } from 'react-hook-form';
import { MarketCondition } from '../../../features/settingCategoryForm/settingMarketForm';
import { Reset } from '../../../shared/ui/icons/icons-tools/Reset';
import { TypeForMarketForm } from './libr/TypeForMarketForm';
import './libr/settingMarketForm.scss';

interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

const SettingMarketForm = ({ setShowFilters }: Props) => {
    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
    };

    const { register, handleSubmit, reset } = useForm<TypeForMarketForm>();

    const onsubmit: SubmitHandler<TypeForMarketForm> = (data) => {
        console.log(data);
        setShowFilters(false);
    };

    const onReset = () => {
        reset();
    };

    return (
        <section className="filters" onClick={handleClick}>
            <form className="filterFoodForm" onSubmit={handleSubmit(onsubmit)}>
                <MarketCondition register={register} />
                <input type="submit" value="Применить" />
                <button className="reset-setting-form" onClick={onReset}>
                    <Reset color="#1F6FDE" />
                    Сбросить фильтры
                </button>
            </form>
        </section>
    );
};

export default SettingMarketForm;
