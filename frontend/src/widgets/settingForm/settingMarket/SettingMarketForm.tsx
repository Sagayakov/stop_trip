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
import { useGetFiltersQuery } from 'app/api/fetchAdverts';
import { District } from 'features/settingCategoryForm/settingMarketForm/District';
import { StickyButton } from 'features/stickyButton/StickyButton';

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
        const { city, market_condition } = data;

        const marketCity = getMultiQuery('city', city);
        const condition = market_condition
            ? `&market_condition=${market_condition}`
            : '';

        setSearchParams(`category=market${marketCity}${condition}&page=1`);
        setShowFilters(false);
        scrollToTop();
    };

    const handleReset = () => {
        reset();
        setSearchParams('category=market&page=1');
        location.reload();
    };

    return (
        <section className={stylesForm.filters} onClick={handleClick}>
            <form
                className={styles.filterFoodForm}
                onSubmit={handleSubmit(onsubmit)}
                id="form-setting-market"
            >
                <District control={control} setValue={setValue} />
                <City control={control} setValue={setValue} watch={watch} />
                <MarketCondition register={register} />
                <StickyButton />
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
