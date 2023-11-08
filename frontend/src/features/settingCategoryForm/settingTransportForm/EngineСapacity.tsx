import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { ArrowDown } from '../../../shared/ui/icons/icons-tools/ArrowDown';
import { ArrowTop } from '../../../shared/ui/icons/icons-tools/ArrowTop';
import { Jackdaw } from '../../../shared/ui/icons/icons-tools/Jackdaw';
import { TypeSettingTransport } from '../../../widgets/settingForm/settingTransport/libr/TypeSettingTransport';
import { toggleDropdown } from './reducer/transportFormDropdown';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
    watch: UseFormWatch<TypeSettingTransport>;
}

export const EngineСapacity = ({ register, watch }: Props) => {
    const engineCapacity = watch('engineСapacity');
    const arrOfValues: string[] = [];

    const showDropDown = useAppSelector(
        (state) => state.transportFormDropdown.engineCapacity
    );
    const dispatch = useAppDispatch();

    for (let i = 1; i <= 9.9; i += 0.1) {
        arrOfValues.push(i.toFixed(1));
    }
    const arr = Array.isArray(engineCapacity) ? true : false

    return (
        <div className="engineСapacity">
            <h3>Объем двигателя</h3>
            <div
                className="select-transportFilter"
                onClick={() => dispatch(toggleDropdown('engineCapacity'))}
            >
                {arr && engineCapacity.length > 0
                    ? engineCapacity
                    : 'Не выбрано'}
                {showDropDown ? (
                    <ArrowTop color="#1C1C1E" />
                ) : (
                    <ArrowDown color="#1C1C1E" />
                )}
            </div>
            {showDropDown && (
                <div className="select-settingFormFilter-dropdown-height-limited">
                    {arrOfValues.map((el) => (
                        <label key={el}>
                            <input
                                type="checkbox"
                                value={el}
                                {...register('engineСapacity')}
                            />
                            {el}
                            {arr && engineCapacity.includes(el) && <Jackdaw />}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};
