import { useEffect } from 'react';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { ArrowDown } from '../../../shared/ui/icons/icons-tools/ArrowDown';
import { ArrowTop } from '../../../shared/ui/icons/icons-tools/ArrowTop';
import { Jackdaw } from '../../../shared/ui/icons/icons-tools/Jackdaw';
import { TypeSettingTransport } from '../../../widgets/settingForm/settingTransport/libr/TypeSettingTransport';
import { valuesOfTransportForm } from '../../../widgets/settingForm/settingTransport/libr/valuesOfTransportForm';
import { useAppSelector, useAppDispatch } from '../../../app/store/hooks';
import { closeDropdownMark } from './reducer/closeTransportFormDropdown';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
    watch: UseFormWatch<TypeSettingTransport>;
}

export const MarkOfTransport = ({ register, watch }: Props) => {
    const markOfTrasport = watch('mark');
    const arrOfValues = valuesOfTransportForm.mark

    const showDropDown = useAppSelector(
        (state) => state.closeTransportFormDropdown.mark
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(closeDropdownMark(false));
    }, [markOfTrasport]);

    return (
        <div className="mark">
            <h3>Марка</h3>
            <div
                className="select-transportFilter"
                onClick={() => dispatch(closeDropdownMark(!showDropDown))}
            >
                {markOfTrasport || 'Не выбрано'}
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
                                {...register('mark')}
                            />
                            {el}
                            {markOfTrasport === el && <Jackdaw />}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};
