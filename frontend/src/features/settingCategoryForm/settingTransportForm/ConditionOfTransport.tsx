import { useEffect, useState } from 'react';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { ArrowDown } from '../../../shared/ui/icons/icons-tools/ArrowDown';
import { ArrowTop } from '../../../shared/ui/icons/icons-tools/ArrowTop';
import { TypeSettingTransport } from '../../../widgets/settingForm/settingTransport/TypeSettingTransport';
import { Jackdaw } from '../../../shared/ui/icons/icons-tools/Jackdaw';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
    watch: UseFormWatch<TypeSettingTransport>;
}

export const ConditionOfTransport = ({ register, watch }: Props) => {
    const condition = watch('condition');
    const [showDropDown, setShowDropDown] = useState(false);

    useEffect(() => {
        setShowDropDown(false)
    }, [condition])

    return (
        <div className="condition">
            <h3>Состояние</h3>
            <div
                className="select-transportFilter"
                onClick={() => setShowDropDown(!showDropDown)}
            >
                {condition || 'Не выбрано'}
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
                            {...register('condition')}
                        />
                        Не выбрано
                        {condition === 'Не выбрано' && <Jackdaw />}
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Новый"
                            {...register('condition')}
                        />
                        Новый
                        {condition === 'Новый' && <Jackdaw />}
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Б/у"
                            {...register('condition')}
                        />
                        Б/у
                        {condition === 'Б/у' && <Jackdaw />}
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Аварийный"
                            {...register('condition')}
                        />
                        Аварийный
                        {condition === 'Аварийный' && <Jackdaw />}
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="На запчасти"
                            {...register('condition')}
                        />
                        На запчасти
                        {condition === 'На запчасти' && <Jackdaw />}
                    </label>
                </div>
            )}
        </div>
    );
};
