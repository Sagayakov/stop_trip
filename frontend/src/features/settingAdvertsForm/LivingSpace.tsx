import { UseFormRegister } from 'react-hook-form';
import { TypeSettingAdverts } from '../../widgets/settingForm/TypeSettingAdverts';

interface Props {
    register: UseFormRegister<TypeSettingAdverts>;
}

export const LivingSpace = ({ register }: Props) => {
    return (
        <div className="living-space">
            <h3>Жилая площадь, м2</h3>
            <div className="living-space-inputs">
                <input
                    id="living-space-input-min"
                    type="number"
                    placeholder="От"
                    {...register('livingSpace.min')}
                />
                <input
                    id="living-space-input-max"
                    type="number"
                    placeholder="До"
                    {...register('livingSpace.max')}
                />
            </div>
        </div>
    );
};
