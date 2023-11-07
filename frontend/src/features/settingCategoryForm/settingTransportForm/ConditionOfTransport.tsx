import { useEffect } from 'react';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { ArrowDown } from '../../../shared/ui/icons/icons-tools/ArrowDown';
import { ArrowTop } from '../../../shared/ui/icons/icons-tools/ArrowTop';
import { Jackdaw } from '../../../shared/ui/icons/icons-tools/Jackdaw';
import { TypeSettingTransport } from '../../../widgets/settingForm/settingTransport/libr/TypeSettingTransport';
import { valuesOfTransportForm } from '../../../widgets/settingForm/settingTransport/libr/valuesOfTransportForm';
import { useAppSelector, useAppDispatch } from '../../../app/store/hooks';
import { closeDropdownCondition } from './reducer/closeTransportFormDropdown';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
    watch: UseFormWatch<TypeSettingTransport>;
}

export const ConditionOfTransport = ({ register, watch }: Props) => {
    const condition = watch('condition');
    const arrOfValue = valuesOfTransportForm.condition

    const showDropDown = useAppSelector(
        (state) => state.closeTransportFormDropdown.condition
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(closeDropdownCondition(false));
    }, [condition]);

    return (
        <div className="condition">
            <h3>Состояние</h3>
            <div
                className="select-transportFilter"
                onClick={() => dispatch(closeDropdownCondition(!showDropDown))}
            >
                {condition || 'Не выбрано'}
                {showDropDown ? (
                    <ArrowTop color="#1C1C1E" />
                ) : (
                    <ArrowDown color="#1C1C1E" />
                )}
            </div>
            {showDropDown && (
                // <div className="select-transportFilter-dropdown">
                <div className="select-settingFormFilter-dropdown-height-limited">
                    {arrOfValue.map((el) => (
                        <label key={el}>
                            <input
                                type="radio"
                                value={el}
                                {...register('condition')}
                            />
                            {el}
                            {condition === el && <Jackdaw />}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};
