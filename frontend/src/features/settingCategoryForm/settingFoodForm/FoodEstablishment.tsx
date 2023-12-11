import { UseFormRegister } from 'react-hook-form';
import { TypeForFoodForm } from '../../../widgets/settingForm/settingFood/libr/TypeForFoodForm';

interface Props {
    register: UseFormRegister<TypeForFoodForm>;
}
export const FoodEstablishment = ({ register }: Props) => {
    return (
        <div className="foodEstablishment">
            <h3>Ресторан/кафе</h3>
            <label className="form-checkbox">
                <input type="checkbox" {...register('food_establishment')} />
                <span>Ресторан/кафе</span>
            </label>
        </div>
    );
};
