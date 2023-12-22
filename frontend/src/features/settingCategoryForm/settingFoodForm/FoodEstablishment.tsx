import { UseFormRegister } from 'react-hook-form';
import { TypeForFoodForm } from 'widgets/settingForm/settingFood/libr/TypeForFoodForm.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingFood/libr/settingFoordForm.module.scss'

interface Props {
    register: UseFormRegister<TypeForFoodForm>;
}
export const FoodEstablishment = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.foodEstablishment}>
            <h3>{t('filters.food_establishment')}</h3>
            <label className="form_checkbox">
                <input type="checkbox" {...register('food_establishment')} />
                <span>{t('filters.food_establishment')}</span>
            </label>
        </div>
    );
};
