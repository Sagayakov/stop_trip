import { useEffect, useState } from 'react';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { ArrowDown } from '../../../shared/ui/icons/icons-tools/ArrowDown';
import { ArrowTop } from '../../../shared/ui/icons/icons-tools/ArrowTop';
import { Jackdaw } from '../../../shared/ui/icons/icons-tools/Jackdaw';
import { TypeSettingTransport } from '../../../widgets/settingForm/settingTransport/libr/TypeSettingTransport';
import { valuesOfTransportForm } from '../../../widgets/settingForm/settingTransport/libr/valuesOfTransportForm';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
    watch: UseFormWatch<TypeSettingTransport>;
}

export const TransportationCategory = ({ register, watch }: Props) => {
    const transportationCategory = watch('transportationCategory');
    const [showDropDown, setShowDropDown] = useState(false);
    const arrOfValues = valuesOfTransportForm.transportationCategory

    useEffect(() => {
        setShowDropDown(false);
    }, [transportationCategory]);

    return (
        <div className="transportationCategory">
            <h3>Категория транспорта</h3>
            <div
                className="select-transportFilter"
                onClick={() => setShowDropDown(!showDropDown)}
            >
                {transportationCategory || 'Не выбрано'}
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
                                {...register('transportationCategory')}
                            />
                            {el}
                            {transportationCategory === el && <Jackdaw />}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};
