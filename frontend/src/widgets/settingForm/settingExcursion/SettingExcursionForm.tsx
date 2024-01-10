import { SubmitHandler, useForm } from 'react-hook-form';
import {
    ExcursionFood,
    ExcursionTransfer,
} from 'features/settingCategoryForm/settingExcursionForm';
import { Reset } from 'shared/ui/icons/icons-tools/Reset.tsx';
import { TypeForExcursionFilter } from './libr/TypeForExcursionFilter';
import { useTranslation } from 'react-i18next';
import styles from './libr/settingExcursionFilter.module.scss';
import { scrollToTop } from 'shared/utils/scrollToTop.ts';
import formStyles from 'widgets/settingForm/forms/filtersForm.module.scss';

interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

const SettingExcursionForm = ({ setShowFilters }: Props) => {
    const { t } = useTranslation();

    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
    };

    const { handleSubmit, reset, register } = useForm<TypeForExcursionFilter>();
    const onSubmit: SubmitHandler<TypeForExcursionFilter> = (data) => {
        console.log(data);
        setShowFilters(false);
        reset();
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
                <ExcursionFood register={register} />
                <ExcursionTransfer register={register} />
                <input type="submit" value={t('filters.apply')} />
                <button
                    className={formStyles.reset_setting_form}
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
