import { useEffect } from 'react';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { ArrowDown } from '../../../shared/ui/icons/icons-tools/ArrowDown';
import { ArrowTop } from '../../../shared/ui/icons/icons-tools/ArrowTop';
import { Jackdaw } from '../../../shared/ui/icons/icons-tools/Jackdaw';
import { TypeSettingTransport } from '../../../widgets/settingForm/settingTransport/libr/TypeSettingTransport';
import { useAppSelector, useAppDispatch } from '../../../app/store/hooks';
import { closeDropdownEngineСapacity } from './reducer/closeTransportFormDropdown';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
    watch: UseFormWatch<TypeSettingTransport>;
}

export const EngineСapacity = ({ register, watch }: Props) => {
    const engineCapacity = watch('engineСapacity');
    const arrOfValues: (string | number)[] = ['Не выбрано'];

    const showDropDown = useAppSelector(
        (state) => state.closeTransportFormDropdown.engineСapacity
    );
    const dispatch = useAppDispatch();

    for (let i = 1; i <= 9.9; i += 0.1) {
        arrOfValues.push(i.toFixed(1));
    }

    useEffect(() => {
        dispatch(closeDropdownEngineСapacity(false));
    }, [engineCapacity]);

    return (
        <div className="engineСapacity">
            <h3>Объем двигателя</h3>
            <div
                className="select-transportFilter"
                onClick={() => dispatch(closeDropdownEngineСapacity(!showDropDown))}
            >
                {engineCapacity || 'Не выбрано'}
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
                                type="radio"
                                value={el}
                                {...register('engineСapacity')}
                            />
                            {el}
                            {engineCapacity === String(el) && <Jackdaw />}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};
