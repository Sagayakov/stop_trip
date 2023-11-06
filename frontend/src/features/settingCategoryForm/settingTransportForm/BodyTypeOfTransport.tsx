import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { TypeSettingTransport } from '../../../widgets/settingForm/settingTransport/TypeSettingTransport';
import { useState, useEffect } from 'react';
import { ArrowDown } from '../../../shared/ui/icons/icons-tools/ArrowDown';
import { ArrowTop } from '../../../shared/ui/icons/icons-tools/ArrowTop';
import { Jackdaw } from '../../../shared/ui/icons/icons-tools/Jackdaw';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
    watch: UseFormWatch<TypeSettingTransport>;
}

export const BodyTypeOfTransport = ({ register, watch }:Props) => {
    const bodyType = watch('bodyType')
    const [showDropDown, setShowDropDown] = useState(false);

    useEffect(() => {
        setShowDropDown(false)
    }, [bodyType])

    return (
        <div className="bodyType">
            <h3>Тип кузова</h3>
            <div
                className="select-transportFilter"
                onClick={() => setShowDropDown(!showDropDown)}
            >
                {bodyType || 'Не выбрано'}
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
                            {...register('bodyType')}
                        />
                        Не выбрано
                        {bodyType === 'Не выбрано' && <Jackdaw />}
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Седан"
                            {...register('bodyType')}
                        />
                        Седан
                        {bodyType === 'Седан' && <Jackdaw />}
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Хэтчбэк"
                            {...register('bodyType')}
                        />
                        Хэтчбэк
                        {bodyType === 'Хэтчбэк' && <Jackdaw />}
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Лифтбэк"
                            {...register('bodyType')}
                        />
                        Лифтбэк
                        {bodyType === 'Лифтбэк' && <Jackdaw />}
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Купе"
                            {...register('bodyType')}
                        />
                        Купе
                        {bodyType === 'Купе' && <Jackdaw />}
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Кабриолет"
                            {...register('bodyType')}
                        />
                        Кабриолет
                        {bodyType === 'Кабриолет' && <Jackdaw />}
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Внедорожник"
                            {...register('bodyType')}
                        />
                        Внедорожник
                        {bodyType === 'Внедорожник' && <Jackdaw />}
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Лимузин"
                            {...register('bodyType')}
                        />
                        Лимузин
                        {bodyType === 'Лимузин' && <Jackdaw />}
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Пикап"
                            {...register('bodyType')}
                        />
                        Пикап
                        {bodyType === 'Пикап' && <Jackdaw />}
                    </label>
                </div>
            )}
        </div>
    );
};
