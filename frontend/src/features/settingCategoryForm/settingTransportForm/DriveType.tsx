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

export const DriveType = ({ register, watch }: Props) => {
    const driveType = watch('drive');
    const arrOfValues = valuesOfTransportForm.drive;
    const typeOfTransport = watch('typeOfTransport')
    const showDropDown = useAppSelector(
        (state) => state.transportFormDropdown.drive
    );
    const dispatch = useAppDispatch();
    const disabled = typeOfTransport == "Водный" ? true : false

    const handleClick = () => {
        if(!disabled){
            dispatch(toggleDropdown('drive'));
        }
    }
    return (
        <div className="drive">
            <h3>Привод</h3>
            <div
                className="select-transportFilter"
                onClick={handleClick}
                style={disabled ? {color: "gray"} : {}}
            >
                {driveType || 'Не выбрано'}
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
                                {...register('drive')}
                            />
                            {el}
                            {driveType === el && <Jackdaw />}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};
