import { SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import {
    FoodDelivery,
    FoodEstablishment,
    FoodType,
} from 'features/settingCategoryForm/settingFoodForm';
import { Reset } from 'shared/ui/icons/icons-tools/Reset.tsx';
import { TypeForFoodForm } from './libr/TypeForFoodForm';
import { searchParamsForFood } from './libr/searchParamsForFood';
import { useTranslation } from 'react-i18next';
import { scrollToTop } from 'shared/utils/scrollToTop.ts';
import styles from './libr/settingFoordForm.module.scss';
import stylesForm from 'widgets/settingForm/forms/filtersForm.module.scss';

interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

const SettingFoodForm = ({ setShowFilters }: Props) => {
    const { t } = useTranslation();

    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
    };
    const [, setSearchParams] = useSearchParams();

    const { register, handleSubmit, reset, setValue, control } =
        useForm<TypeForFoodForm>();

    const onsubmit: SubmitHandler<TypeForFoodForm> = (data) => {
        const { food_delivery, food_establishment, food_type } = data;

        const { delivery, establishment, type } = searchParamsForFood(
            food_delivery,
            food_establishment,
            food_type
        );
        setSearchParams(
            `category=food${type}${delivery}${establishment}&page=1`
        );

        setShowFilters(false);
        scrollToTop();
    };

    const onReset = () => {
        reset();
        scrollToTop();
    };

    return (
        <section className={stylesForm.filters} onClick={handleClick}>
            <form
                className={styles.filterFoodForm}
                onSubmit={handleSubmit(onsubmit)}
                id="form-setting-food"
            >
                <FoodType control={control} setValue={setValue} />
                <FoodDelivery register={register} />
                <FoodEstablishment register={register} />
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

export default SettingFoodForm;
