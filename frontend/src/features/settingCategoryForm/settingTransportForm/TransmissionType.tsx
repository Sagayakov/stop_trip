import { useEffect } from 'react';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { ArrowDown } from '../../../shared/ui/icons/icons-tools/ArrowDown';
import { ArrowTop } from '../../../shared/ui/icons/icons-tools/ArrowTop';
import { Jackdaw } from '../../../shared/ui/icons/icons-tools/Jackdaw';
import { TypeSettingTransport } from '../../../widgets/settingForm/settingTransport/libr/TypeSettingTransport';
import { valuesOfTransportForm } from '../../../widgets/settingForm/settingTransport/libr/valuesOfTransportForm';
import { useAppSelector, useAppDispatch } from '../../../app/store/hooks';
import { closeDropdownTransmissionType } from './reducer/closeTransportFormDropdown';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
    watch: UseFormWatch<TypeSettingTransport>;
}

export const TransmissionType = ({ register, watch }: Props) => {
    const transmissionType = watch('transmissionType');
    const arrOfValues = valuesOfTransportForm.transmissionType

    const showDropDown = useAppSelector(
        (state) => state.closeTransportFormDropdown.transmissionType
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(closeDropdownTransmissionType(false));
    }, [transmissionType]);

    return (
        <div className="transmissionType">
            <h3>Тип коробки передач</h3>
            <div
                className="select-transportFilter"
                onClick={() => dispatch(closeDropdownTransmissionType(!showDropDown))}
            >
                {transmissionType || 'Не выбрано'}
                {showDropDown ? (
                    <ArrowTop color="#1C1C1E" />
                ) : (
                    <ArrowDown color="#1C1C1E" />
                )}
            </div>
            {showDropDown && (
                // <div className="select-transportFilter-dropdown">
                <div className="select-settingFormFilter-dropdown-height-limited">
                    {arrOfValues.map((el) => (
                        <label key={el}>
                            <input
                                type="radio"
                                value={el}
                                {...register('transmissionType')}
                            />
                            {el}
                            {transmissionType === el && <Jackdaw />}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};
