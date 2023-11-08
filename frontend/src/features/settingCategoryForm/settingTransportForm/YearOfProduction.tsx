import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { ArrowDown } from '../../../shared/ui/icons/icons-tools/ArrowDown';
import { ArrowTop } from '../../../shared/ui/icons/icons-tools/ArrowTop';
import { Jackdaw } from '../../../shared/ui/icons/icons-tools/Jackdaw';
import { TypeSettingTransport } from '../../../widgets/settingForm/settingTransport/libr/TypeSettingTransport';
import { toggleDropdown } from './reducer/transportFormDropdown';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
    watch: UseFormWatch<TypeSettingTransport>;
}

export const YearOfProduction = ({ register, watch }: Props) => {
    const yearOfProduction = watch('yearOfProduction');
    const arrOfValues: string[] = [];

    const showDropDown = useAppSelector(
        (state) => state.transportFormDropdown.yearOfProduction
    );
    const dispatch = useAppDispatch();

    let i = new Date().getFullYear();
    for (i; i > 1970; i--) {
        arrOfValues.push(String(i));
    }
    const arr = Array.isArray(yearOfProduction) ? true : false
    return (
        <div className="yearOfProduction">
            <h3>Год производства</h3>
            <div
                className="select-transportFilter"
                onClick={() => dispatch(toggleDropdown('yearOfProduction'))}
            >
                {arr && yearOfProduction.length > 0
                    ? yearOfProduction
                    : 'Не выбрано'
                }
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
                                {...register('yearOfProduction')}
                            />
                            {el}
                            {arr && yearOfProduction.includes(el) && <Jackdaw />}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};
