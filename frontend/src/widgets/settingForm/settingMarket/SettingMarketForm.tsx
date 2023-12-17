import { SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { MarketCondition } from 'features/settingCategoryForm/settingMarketForm';
import { Reset } from 'shared/ui/icons/icons-tools/Reset.tsx';
import { TypeForMarketForm } from './libr/TypeForMarketForm';
import './libr/settingMarketForm.scss';
import { useTranslation } from 'react-i18next';

interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

const SettingMarketForm = ({ setShowFilters }: Props) => {
    const [, setSearchParams] = useSearchParams();
    const { t } = useTranslation();

    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
    };

    const { register, handleSubmit, reset } = useForm<TypeForMarketForm>();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const onsubmit: SubmitHandler<TypeForMarketForm> = (data) => {
        const { market_condition } = data;
        const category = market_condition ? 'category=market' : '';
        const condition = market_condition ? '&market_condition=' : '';
        let params = '';
        if (market_condition.length === 2) {
            params = `${market_condition[0]}%2C${market_condition[1]}`;
        }
        if (market_condition.length === 1) {
            params = `${market_condition[0]}`;
        }
        setSearchParams(`${category}${condition}${params}`);
        setShowFilters(false);
        scrollToTop();
    };

    const onReset = () => {
        reset();
    };

    return (
        <section className="filters" onClick={handleClick}>
            <form className="filterFoodForm" onSubmit={handleSubmit(onsubmit)}>
                <MarketCondition register={register} />
                <input type="submit" value={t('filters.apply')} />
                <button className="reset-setting-form" onClick={onReset}>
                    <Reset color="#1F6FDE" />
                    {t('filters.reset')}
                </button>
            </form>
        </section>
    );
};

export default SettingMarketForm;
