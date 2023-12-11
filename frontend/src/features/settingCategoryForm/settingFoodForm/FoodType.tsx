import { Control, UseFormSetValue } from 'react-hook-form';
import { UniversalSelectDropdown } from '../../../entities/universalDropdown/UniversalSelectDropdown';
import { TypeForFoodForm } from '../../../widgets/settingForm/settingFood/libr/TypeForFoodForm';

interface Props {
    setValue: UseFormSetValue<TypeForFoodForm>;
    control: Control<TypeForFoodForm, string[]>;
}

export const FoodType = ({ control, setValue }: Props) => {
    const options = [
        { value: 'veg_food', label: 'Вегетарианская еда' },
        { value: 'non_veg_food', label: 'Невегетарианская еда' },
        { value: 'ready_food', label: 'Готовая еда' },
        { value: 'semi_finished_food', label: 'Полуфабрикаты' },
        { value: 'other_food', label: 'Другое' },
    ];

    return (
        <div className="foodType">
            <h3>Тип еды</h3>
            <UniversalSelectDropdown<TypeForFoodForm>
                closeMenuOnSelect={false}
                control={control}
                isMulti={true}
                name="food_type"
                options={options}
                placeholder="Тип еды"
                prefix="filterFoodForm"
                setValue={setValue}
            />
        </div>
    );
};
