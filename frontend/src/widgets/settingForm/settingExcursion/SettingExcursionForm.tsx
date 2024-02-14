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

interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

const SettingExcursionForm = ({ setShowFilters }: Props) => {
    const { t } = useTranslation();
    const [, setSearchParams] = useSearchParams();

    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
    };

    const { handleSubmit, reset, register, control, setValue } =
        useForm<TypeForExcursionFilter>();

    const onSubmit: SubmitHandler<TypeForExcursionFilter> = (data) => {
        const { city, excursion_food, excursion_transfer } = data;
        const filters = getSearchParams(
            city,
            excursion_food,
            excursion_transfer
        );
        setSearchParams(`category=excursion${filters}&page=1`);
        setShowFilters(false);
        scrollToTop();
    };

    const onReset = () => {
        reset();
        scrollToTop();
    };

    return (
        <section className={formStyles.filters} onClick={handleClick}>
            <form
                className={styles.filterExcursionForm}
                onSubmit={handleSubmit(onSubmit)}
                id="form-setting-excursion"
            >
                <City control={control} setValue={setValue} />
                <ExcursionFood register={register} />
                <ExcursionTransfer register={register} />
                <input type="submit" value={t('filters.apply')} />
                <button
                    className={`${styles.reset_setting_form} ${formStyles.reset_setting_form}`}
                    onClick={onReset}
                >
                    <Reset color="#1F6FDE" />
                    {t('filters.reset')}
                </button>
            </form>
        </section>
    );
};

export default SettingExcursionForm;
