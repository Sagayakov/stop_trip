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
    const arrOfValues: (string | number)[] = ['Не выбрано'];

    const showDropDown = useAppSelector(
        (state) => state.transportFormDropdown.yearOfProduction
    );
    const dispatch = useAppDispatch();

    let i = new Date().getFullYear();
    for (i; i > 1970; i--) {
        arrOfValues.push(i);
    }

    return (
        <div className="yearOfProduction">
            <h3>Год производства</h3>
            <div
                className="select-transportFilter"
                onClick={() => dispatch(toggleDropdown('yearOfProduction'))}
            >
                {yearOfProduction || 'Не выбрано'}
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
                                {...register('yearOfProduction')}
                            />
                            {el}
                            {yearOfProduction === String(el) && <Jackdaw />}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};
