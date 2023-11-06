import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { TypeSettingTransport } from '../../../widgets/settingForm/settingTransport/TypeSettingTransport';
import { useState, useEffect } from 'react';
import { ArrowDown } from '../../../shared/ui/icons/icons-tools/ArrowDown';
import { ArrowTop } from '../../../shared/ui/icons/icons-tools/ArrowTop';
import { Jackdaw } from '../../../shared/ui/icons/icons-tools/Jackdaw';

interface Props {
    register: UseFormRegister<TypeSettingTransport>
    watch: UseFormWatch<TypeSettingTransport>
}

export const DriveType = ({ register, watch }:Props) => {
    const driveType = watch('drive')
    const [showDropDown, setShowDropDown] = useState(false);

    useEffect(() => {
        setShowDropDown(false);
    }, [driveType]);

    return (
        <div className="drive">
            <h3>Привод</h3>
            <div
                className="select-transportFilter"
                onClick={() => setShowDropDown(!showDropDown)}
            >
                {driveType || 'Не выбрано'}
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
                            {...register('drive')}
                        />
                        Не выбрано
                        {driveType === 'Не выбрано' && <Jackdaw />}
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Передний"
                            {...register('drive')}
                        />
                        Передний
                        {driveType === 'Передний' && <Jackdaw />}
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Задний"
                            {...register('drive')}
                        />
                        Задний
                        {driveType === 'Задний' && <Jackdaw />}
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Постоянный полный"
                            {...register('drive')}
                        />
                        Постоянный полный
                        {driveType === 'Постоянный полный' && <Jackdaw />}
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Полный подключаемый"
                            {...register('drive')}
                        />
                        Полный подключаемый
                        {driveType === 'Полный подключаемый' && <Jackdaw />}
                    </label>
                </div>
            )}
        </div>
    );
};
