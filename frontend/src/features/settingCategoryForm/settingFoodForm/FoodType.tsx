import { Control, UseFormSetValue } from 'react-hook-form';
import { UniversalSelectDropdown } from 'entities/universalEntites/UniversalSelectDropdown';
import { TypeForFoodForm } from 'widgets/settingForm/settingFood/libr/TypeForFoodForm.ts';
import { useTranslation } from 'react-i18next';

interface Props {
    setValue: UseFormSetValue<TypeForFoodForm>;
    control: Control<TypeForFoodForm, string[]>;
}

export const FoodType = ({ control, setValue }: Props) => {
    const { t } = useTranslation();

    const options = [
        { value: 'veg_food', label: 'Вегетарианская еда' },
        { value: 'non_veg_food', label: 'Невегетарианская еда' },
        { value: 'ready_food', label: 'Готовая еда' },
        { value: 'semi_finished_food', label: 'Полуфабрикаты' },
        { value: 'other_food', label: 'Другое' },
    ];

    return (
        <div className="foodType">
            <h3>{t('filters.food_type')}</h3>
            <UniversalSelectDropdown<TypeForFoodForm>
                closeMenuOnSelect={false}
                control={control}
                isMulti={true}
                name="food_type"
                options={options}
                placeholder={t('filters.food_type')}
                prefix="filterFoodForm"
                setValue={setValue}
            />
        </div>
    );
};
