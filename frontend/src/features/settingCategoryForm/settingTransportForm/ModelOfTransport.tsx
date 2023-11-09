import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { ArrowDown } from '../../../shared/ui/icons/icons-tools/ArrowDown';
import { ArrowTop } from '../../../shared/ui/icons/icons-tools/ArrowTop';
import { Jackdaw } from '../../../shared/ui/icons/icons-tools/Jackdaw';
import { TypeSettingTransport } from '../../../widgets/settingForm/settingTransport/libr/TypeSettingTransport';
import { valuesOfTransportForm } from '../../../widgets/settingForm/settingTransport/libr/valuesOfTransportForm';
import { toggleDropdown } from './reducer/transportFormDropdown';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
    watch: UseFormWatch<TypeSettingTransport>;
}

export const ModelOfTransport = ({ register, watch }: Props) => {
    const modelOfTransport = watch('model');
    const markOfTrasport = watch('mark');
    const arrOfValues = valuesOfTransportForm.model;

    const disabled =
        markOfTrasport === 'Не выбрано' || !markOfTrasport ? true : false;

    const showDropDown = useAppSelector(
        (state) => state.transportFormDropdown.model
    );
    const dispatch = useAppDispatch();

    const handleClick = () => {
        if (disabled) {
            return null;
        } else {
            dispatch(toggleDropdown('model'));
        }
    };

    return (
        <div className="model">
            {showDropDown && (
                <div
                    className="typeOfService-background"
                    onClick={() => dispatch(toggleDropdown('model'))}
                />
            )}
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
