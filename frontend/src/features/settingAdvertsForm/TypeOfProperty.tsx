import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { ArrowDown } from '../../shared/ui/icons/icons-tools/ArrowDown';
import { ArrowTop } from '../../shared/ui/icons/icons-tools/ArrowTop';
import { Jackdaw } from '../../shared/ui/icons/icons-tools/Jackdaw';
import { TypeSettingAdverts } from '../../widgets/settingForm/TypeSettingAdverts';
import { useEffect } from 'react';

interface Props {
    register: UseFormRegister<TypeSettingAdverts>;
    watch: UseFormWatch<TypeSettingAdverts>;
    showDropDown: boolean;
    setShowDropDown: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TypeOfProperty = ({
    register,
    watch,
    showDropDown,
    setShowDropDown,
}: Props) => {
    const type = watch('typeOfProperty');

    useEffect(() => {
        setShowDropDown(false)
    }, [type])

    return (
        <>
            <div
                className="type-of-property"
                onClick={(event) => event.stopPropagation()}
            >
                <h3>Тип недвижимости</h3>
                <div
                    className="select-type-of-property"
                    onClick={() => setShowDropDown(!showDropDown)}
                >
                    {type ? type : 'Не выбрано'}
                    {showDropDown ? (
                        <ArrowTop color="#1C1C1E" />
                    ) : (
                        <ArrowDown color="#1C1C1E" />
                    )}
                </div>
                {showDropDown && (
                    <div className="select-type-of-property-var">
                        <label
                            style={
                                type === 'Не выбрано'
                                    ? { color: '#02C66E' }
                                    : {}
                            }
                        >
                            Не выбрано
                            <>
                                {type === 'Не выбрано' && <Jackdaw />}
                                <input
                                    type="radio"
                                    value="Не выбрано"
                                    {...register('typeOfProperty')}
                                />
                            </>
                        </label>
                        <label
                            style={
                                type === 'Квартира' ? { color: '#02C66E' } : {}
                            }
                        >
                            Квартира
                            <>
                                {type === 'Квартира' && <Jackdaw />}
                                <input
                                    type="radio"
                                    value="Квартира"
                                    {...register('typeOfProperty')}
                                />
                            </>
                        </label>
                        <label
                            style={
                                type === 'Комната' ? { color: '#02C66E' } : {}
                            }
                        >
                            Комната
                            <>
                                {type === 'Комната' && <Jackdaw />}
                                <input
                                    type="radio"
                                    value="Комната"
                                    {...register('typeOfProperty')}
                                />
                            </>
                        </label>
                        <label
                            style={type === 'Дом' ? { color: '#02C66E' } : {}}
                        >
                            Дом
                            <>
                                {type === 'Дом' && <Jackdaw />}
                                <input
                                    type="radio"
                                    value="Дом"
                                    {...register('typeOfProperty')}
                                />
                            </>
                        </label>
                    </div>
                )}
            </div>
        </>
    );
};
