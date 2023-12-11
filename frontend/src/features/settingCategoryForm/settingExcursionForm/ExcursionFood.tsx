import { UseFormRegister } from 'react-hook-form';
import { TypeForExcursionFilter } from '../../../widgets/settingForm/settingExcursion/libr/TypeForExcursionFilter';

interface Props {
    register: UseFormRegister<TypeForExcursionFilter>;
}

export const ExcursionFood = ({ register }: Props) => {
    return (
        <div className="settingExcursion">
            <h3>Еда</h3>
            <label className="form-checkbox">
                <input type="checkbox" {...register('excursion_food')} />
                <span>Еда включена</span>
            </label>
        </div>
    );
};
