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

export const EngineType = ({ register, watch }: Props) => {
    const engineType = watch('engineType');
    const arrOfValues = valuesOfTransportForm.engineType;

    const showDropDown = useAppSelector(
        (state) => state.transportFormDropdown.engineType
    );
    const dispatch = useAppDispatch();

    return (
        <div className="engineType">
            <h3>Тип двигателя</h3>
            <div
                className="select-transportFilter"
                onClick={() => dispatch(toggleDropdown('engineType'))}
            >
                {engineType || 'Не выбрано'}
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
                                type="checkbox"
                                value={el}
                                {...register('engineType')}
                            />
                            {el}
                            {engineType === el && <Jackdaw />}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};
