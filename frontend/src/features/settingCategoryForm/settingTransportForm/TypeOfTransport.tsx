import { UseFormRegister, UseFormWatch } from 'react-hook-form';
// import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
// import { ArrowDown } from '../../../shared/ui/icons/icons-tools/ArrowDown';
// import { ArrowTop } from '../../../shared/ui/icons/icons-tools/ArrowTop';
// import { Jackdaw } from '../../../shared/ui/icons/icons-tools/Jackdaw';
import { TypeSettingTransport } from '../../../widgets/settingForm/settingTransport/libr/TypeSettingTransport';
// import { valuesOfTransportForm } from '../../../widgets/settingForm/settingTransport/libr/valuesOfTransportForm';
// import { toggleDropdown } from './reducer/transportFormDropdown';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
    watch: UseFormWatch<TypeSettingTransport>;
}
//все закомментированное - для выпадающего списка!!
export const TypeOfTransport = ({ register, /*watch */}: Props) => {
    // const typeOfTransport = watch('typeOfTransport');
    // const arrOfValues = valuesOfTransportForm.typeOfTransport;

    // const showDropDown = useAppSelector(
    //     (state) => state.transportFormDropdown.typeOfTransport
    // );
    // const dispatch = useAppDispatch();

    return (
        <div className="typeOfTransport">
            {/* {showDropDown && (
                <div
                    className="typeOfService-background"
                    onClick={() => dispatch(toggleDropdown('typeOfTransport'))}
                />
            )} */}
            <h3>Тип транспорта</h3>
            <div className="setting-typeOfTransport">
                <label className="form-checkbox">
                    <input
                        type="radio"
                        {...register('typeOfTransport')}
                        value="Наземный"
                    />
                    <span>Наземный</span>
                </label>
                <label className="form-checkbox">
                    <input
                        type="radio"
                        {...register('typeOfTransport')}
                        value="Водный"
                    />
                    <span>Водный</span>
                </label>
            </div>

            {/* <div
                className="select-transportFilter"
                onClick={() => dispatch(toggleDropdown('typeOfTransport'))}
            >
                {typeOfTransport || 'Не выбрано'}
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
                                {...register('typeOfTransport')}
                                onClick={() =>
                                    dispatch(toggleDropdown('typeOfTransport'))
                                }
                            />
                            {el}
                            {typeOfTransport === el && <Jackdaw />}
                        </label>
                    ))}
                </div>
            )} */}
        </div>
    );
};
