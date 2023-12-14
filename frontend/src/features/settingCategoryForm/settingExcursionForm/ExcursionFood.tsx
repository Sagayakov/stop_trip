import { UseFormRegister } from 'react-hook-form';
import { TypeForExcursionFilter } from '../../../widgets/settingForm/settingExcursion/libr/TypeForExcursionFilter';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<TypeForExcursionFilter>;
}

export const ExcursionFood = ({ register }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="settingExcursion">
            <h3>{t('filters.food')}</h3>
            <label className="form-checkbox">
                <input type="checkbox" {...register('excursion_food')} />
                <span>{t('filters.food-included')}</span>
            </label>
        </div>
    );
};
