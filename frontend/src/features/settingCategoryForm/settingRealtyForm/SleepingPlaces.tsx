import { UseFormRegister } from 'react-hook-form';
import { TypeSettingRealty } from '../../../widgets/settingForm/settingRealty/libr/TypeSettingRealty';

interface Props {
    register: UseFormRegister<TypeSettingRealty>;
}

export const SleepingPlaces = ({ register }: Props) => {
    return (
        <div className="sleepingPlaces">
            <h3>Количество спальных мест</h3>
            <div className="setting-sleepingPlaces">
                <input
                    type="number"
                    placeholder="Количество"
                    min={0}
                    {...register('sleepingPlaces')}
                />
            </div>
        </div>
    );
};
