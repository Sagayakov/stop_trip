import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { TypeSettingTransport } from '../../../widgets/settingForm/settingTransport/TypeSettingTransport';
import { useEffect, useState } from 'react';
import { ArrowDown } from '../../../shared/ui/icons/icons-tools/ArrowDown';
import { ArrowTop } from '../../../shared/ui/icons/icons-tools/ArrowTop';
import { Jackdaw } from '../../../shared/ui/icons/icons-tools/Jackdaw';

interface Props {
    register: UseFormRegister<TypeSettingTransport>
    watch: UseFormWatch<TypeSettingTransport>
}

export const TransmissionType = ({ register, watch }:Props) => {
    const transmissionType = watch('transmissionType')
    const [showDropDown, setShowDropDown] = useState(false);

    useEffect(() => {
        setShowDropDown(false);
    }, [transmissionType]);


    return (
        <div className="transmissionType">
            <h3>Тип коробки передач</h3>
            <div
                className="select-transportFilter"
                onClick={() => setShowDropDown(!showDropDown)}
            >
                {transmissionType || 'Не выбрано'}
                {showDropDown ? (
                    <ArrowTop color="#1C1C1E" />
                ) : (
                    <ArrowDown color="#1C1C1E" />
                )}
            </div>
            {showDropDown && (
                <div className="select-transportFilter-dropdown">
                    <label>
                        <input
                            type="radio"
                            value="Не выбрано"
                            {...register('transmissionType')}
                        />
                        Не выбрано
                        {transmissionType === 'Не выбрано' && <Jackdaw />}
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="МКПП"
                            {...register('transmissionType')}
                        />
                        МКПП
                        {transmissionType === 'МКПП' && <Jackdaw />}
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="АКПП"
                            {...register('transmissionType')}
                        />
                        АКПП
                        {transmissionType === 'АКПП' && <Jackdaw />}
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Робот"
                            {...register('transmissionType')}
                        />
                        Робот
                        {transmissionType === 'Робот' && <Jackdaw />}
                    </label>
                </div>
            )}
        </div>
    );
};
