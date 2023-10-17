import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { ArrowDown } from '../../shared/ui/icons/icons-tools/ArrowDown';
import { ArrowTop } from '../../shared/ui/icons/icons-tools/ArrowTop';
import { TypeSettingAdverts } from '../../widgets/settingForm/TypeSettingAdverts';

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
    const checkedSelect = () => {
        return type === 'Квартира' ? { color: '#02C66E' } : {};
    };
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
                            <input
                                type="radio"
                                value="Не выбрано"
                                {...register('typeOfProperty')}
                            />
                        </label>
                        <label
                            style={
                                type === 'Квартира' ? { color: '#02C66E' } : {}
                            }
                        >
                            Квартира
                            <input
                                type="radio"
                                value="Квартира"
                                {...register('typeOfProperty')}
                            />
                        </label>
                        <label
                            style={
                                type === 'Комната' ? { color: '#02C66E' } : {}
                            }
                        >
                            Комната
                            <input
                                type="radio"
                                value="Комната"
                                {...register('typeOfProperty')}
                            />
                        </label>
                        <label
                            style={type === 'Дом' ? { color: '#02C66E' } : {}}
                        >
                            Дом
                            <input
                                type="radio"
                                value="Дом"
                                {...register('typeOfProperty')}
                            />
                        </label>
                    </div>
                )}
            </div>
        </>
    );
};
