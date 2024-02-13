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

interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

const SettingMarketForm = ({ setShowFilters }: Props) => {
    const [, setSearchParams] = useSearchParams();
    const { t } = useTranslation();

    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
    };

    const { register, handleSubmit, reset, setValue, control } =
        useForm<TypeForMarketForm>();

    const onsubmit: SubmitHandler<TypeForMarketForm> = (data) => {
        const { city, market_condition } = data;

        const marketCity = getMultiQuery('city', city);
        const condition = market_condition
            ? `&market_condition=${market_condition}`
            : '';

        setSearchParams(`category=market${marketCity}${condition}&page=1`);
        setShowFilters(false);
        scrollToTop();
    };

    const onReset = () => {
        reset();
    };

    return (
        <section className={stylesForm.filters} onClick={handleClick}>
            <form
                className={styles.filterFoodForm}
                onSubmit={handleSubmit(onsubmit)}
                id="form-setting-market"
            >
                <City control={control} setValue={setValue} />
                <MarketCondition register={register} />
                <input type="submit" value={t('filters.apply')} />
                <button
                    className={`${stylesForm.reset_setting_form} ${styles.reset_setting_form}`}
                    onClick={onReset}
                >
                    <Reset color="#1F6FDE" />
                    {t('filters.reset')}
                </button>
            </form>
        </section>
    );
};

export default SettingMarketForm;
