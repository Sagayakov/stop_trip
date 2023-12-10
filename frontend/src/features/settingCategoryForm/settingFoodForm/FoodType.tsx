import { UniversalSelectDropdown } from '../../../entities/universalDropdown/UniversalSelectDropdown';
import { Control, UseFormSetValue } from 'react-hook-form';
import { TypeForFoodForm } from '../../../widgets/settingForm/settingFood/libr/TypeForFoodForm';

interface Props {
    setValue: UseFormSetValue<TypeForFoodForm>;
    control: Control<TypeForFoodForm, string[]>;
}

export const FoodType = ({ control, setValue }: Props) => {
    const options = [{ label: 'label', value: 'value' }];

    return (
        <div className="foodType">
            <h3>Тип еды</h3>
            <UniversalSelectDropdown<TypeForFoodForm>
                closeMenuOnSelect
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
