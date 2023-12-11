import { UseFormRegister } from 'react-hook-form';
import { TypeForFoodForm } from '../../../widgets/settingForm/settingFood/libr/TypeForFoodForm';

interface Props {
    register: UseFormRegister<TypeForFoodForm>;
}

export const FoodDelivery = ({ register }: Props) => {
    return (
        <div className="foodDelivery">
            <h3>Доставка еды</h3>
            <label className="form-checkbox">
                <input type="checkbox" {...register('food_delivery')} />
                <span>Доставка</span>
            </label>
        </div>
    );
};
