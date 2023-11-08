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

export const TransportationCategory = ({ register, watch }: Props) => {
    const transportationCategory = watch('transportationCategory');
    const arrOfValues = valuesOfTransportForm.transportationCategory;

    const showDropDown = useAppSelector(
        (state) => state.transportFormDropdown.transportationCategory
    );
    const dispatch = useAppDispatch();

    const arr = Array.isArray(transportationCategory)

    return (
        <div className="transportationCategory">
            <h3>Категория транспорта</h3>
            <div
                className="select-transportFilter"
                onClick={() =>
                    dispatch(toggleDropdown('transportationCategory'))
                }
            >
                {(arr && transportationCategory.length > 0) ? transportationCategory : 'Не выбрано'}
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
                                {...register('transportationCategory')}
                            />
                            {el}
                            {arr && transportationCategory.includes(el) && <Jackdaw />}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};
