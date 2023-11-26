import { UseFormRegister } from 'react-hook-form';
import { TypeSettingRealty } from '../../../widgets/settingForm/settingRealty/libr/TypeSettingRealty';

interface Props {
    register: UseFormRegister<TypeSettingRealty>;
}

export const BathroomQuantity = ({ register }: Props) => {
    return (
        <div className="bathroom-quantity">
            <h3>Количество санузлов</h3>
            <div className="setting-rooms-quantity">
                    <input
                        type="number"
                        placeholder='Количество'
                        min={0}
                        {...register('bathroomQuantity')}
                    />
            </div>
        </div>
    );
};
