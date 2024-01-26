import { SubmitHandler, useForm } from 'react-hook-form';
import {
    SettingTaxiPrice,
    TypeOfTaxi,
    UnitOfMeasurement,
} from 'features/settingCategoryForm/settingTaxiForm';
import { Reset } from 'shared/ui/icons/icons-tools/Reset.tsx';
import { TypeSettingTaxi } from './libr/TypeSettingTaxi';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getSearchParams } from 'widgets/settingForm/settingTaxi/libr/getSearchParams.ts';
import { scrollToTop } from 'shared/utils/scrollToTop.ts';
import styles from './libr/settingTaxiForm.module.scss';
import formStyles from 'widgets/settingForm/forms/filtersForm.module.scss';

interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

const SettingTaxiForm = ({ setShowFilters }: Props) => {
    const [, setSearchParams] = useSearchParams();
    const { t } = useTranslation();

    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
    };

    const { register, handleSubmit, reset, setValue, control } =
        useForm<TypeSettingTaxi>();

    const onsubmit: SubmitHandler<TypeSettingTaxi> = (data) => {
        const { taxi_unit, taxi_type, price } = data;
        const filters = getSearchParams(taxi_type, taxi_unit, price);
        setSearchParams(`category=taxi${filters}&page=1`);
        scrollToTop();
        setShowFilters(false);
    };

    const onReset = () => {
        reset();
        scrollToTop();
    };

    return (
        <section className={formStyles.filters} onClick={handleClick}>
            <form
                className={styles.filterTaxiForm}
                onSubmit={handleSubmit(onsubmit)}
                autoComplete="off"
                id="form-setting-taxi"
            >
                <UnitOfMeasurement register={register} />
                <TypeOfTaxi control={control} setValue={setValue} />
                <SettingTaxiPrice register={register} />
                <input type="submit" value={t('filters.apply')} />
                <button
                    className={`${formStyles.reset_setting_form} ${styles.reset_setting_form}`}
                    onClick={onReset}
                >
                    <Reset color="#1F6FDE" />
                    {t('filters.reset')}
                </button>
            </form>
        </section>
    );
};

export default SettingTaxiForm;
