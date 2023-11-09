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

export const BodyTypeOfTransport = ({ register, watch }: Props) => {
    const bodyType = watch('bodyType');
    const arrOfValue = valuesOfTransportForm.bodyType;

    const showDropDown = useAppSelector(
        (state) => state.transportFormDropdown.bodyType
    );
    const dispatch = useAppDispatch();

    return (
        <div className="bodyType">
            {showDropDown && (
                <div
                    className="typeOfService-background"
                    onClick={() => dispatch(toggleDropdown('bodyType'))}
                />
            )}
            <h3>Тип кузова</h3>
            <div
                className="select-transportFilter"
                onClick={() => dispatch(toggleDropdown('bodyType'))}
            >
                {bodyType || 'Не выбрано'}
                {showDropDown ? (
                    <ArrowTop color="#1C1C1E" />
                ) : (
                    <ArrowDown color="#1C1C1E" />
                )}
            </div>
            {showDropDown && (
                <div className="select-settingFormFilter-dropdown-height-limited">
                    {arrOfValue.map((el) => (
                        <label key={el}>
                            <input
                                type="radio"
                                value={el}
                                {...register('bodyType')}
                            />
                            {el}
                            {bodyType === el && <Jackdaw />}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};
