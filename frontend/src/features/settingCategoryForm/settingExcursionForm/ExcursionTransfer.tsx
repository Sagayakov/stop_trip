import { UseFormRegister } from 'react-hook-form';
import { TypeForExcursionFilter } from '../../../widgets/settingForm/settingExcursion/libr/TypeForExcursionFilter';

interface Props {
    register: UseFormRegister<TypeForExcursionFilter>;
}

export const ExcursionTransfer = ({ register }: Props) => {
    return (
        <div className="settingExcursion">
            <h3>Трансфер</h3>
            <label className="form-checkbox">
                <input type="checkbox" {...register('excursion_transfer')} />
                <span>Трансфер</span>
            </label>
        </div>
    );
};
