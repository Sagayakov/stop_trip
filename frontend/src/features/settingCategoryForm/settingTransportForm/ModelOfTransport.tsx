import { useEffect } from 'react';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { ArrowDown } from '../../../shared/ui/icons/icons-tools/ArrowDown';
import { ArrowTop } from '../../../shared/ui/icons/icons-tools/ArrowTop';
import { Jackdaw } from '../../../shared/ui/icons/icons-tools/Jackdaw';
import { TypeSettingTransport } from '../../../widgets/settingForm/settingTransport/libr/TypeSettingTransport';
import { valuesOfTransportForm } from '../../../widgets/settingForm/settingTransport/libr/valuesOfTransportForm';
import { useAppSelector, useAppDispatch } from '../../../app/store/hooks';
import { closeDropdownModel } from './reducer/closeTransportFormDropdown';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
    watch: UseFormWatch<TypeSettingTransport>;
}

export const ModelOfTransport = ({ register, watch }: Props) => {
    const modelOfTransport = watch('model');
    const markOfTrasport = watch('mark');
    const arrOfValues = valuesOfTransportForm.model

    const disabled = (markOfTrasport === 'Не выбрано' || !markOfTrasport) ? true : false;

    const showDropDown = useAppSelector(
        (state) => state.closeTransportFormDropdown.model
    );
    const dispatch = useAppDispatch();

    const handleClick = () => {
        if (disabled) {
            return null;
        } else {
            dispatch(closeDropdownModel((!showDropDown)));
        }
    };

    useEffect(() => {
        dispatch(closeDropdownModel((false)));
    }, [modelOfTransport]);

    return (
        <div className="model">
            <h3>Модель</h3>
            <div
                className="select-transportFilter"
                onClick={handleClick}
                style={disabled ? { color: '#8f8f8f' } : {}}
            >
                {modelOfTransport || 'Не выбрано'}
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
                                {...register('model')}
                            />
                            {el}
                            {modelOfTransport === el && <Jackdaw />}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};
