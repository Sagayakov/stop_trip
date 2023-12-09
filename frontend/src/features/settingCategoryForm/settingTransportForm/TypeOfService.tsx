import { UseFormRegister, UseFormWatch } from 'react-hook-form';
// import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
// import { ArrowDown } from '../../../shared/ui/icons/icons-tools/ArrowDown';
// import { ArrowTop } from '../../../shared/ui/icons/icons-tools/ArrowTop';
// import { Jackdaw } from '../../../shared/ui/icons/icons-tools/Jackdaw';
import { TypeSettingTransport } from '../../../widgets/settingForm/settingTransport/libr/TypeSettingTransport';
import { useGetFiltersQuery } from '../../../app/api/fetchAdverts';
import { ChoicesType, SelectType } from '../../../app/api/types/filtersType';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
    watch: UseFormWatch<TypeSettingTransport>;
}

export const TypeOfService = ({ register /*watch*/ }: Props) => {
    const { data } = useGetFiltersQuery('');
    // const typeOfService = watch('typeOfService');
    // const arrOfValues = valuesOfTransportForm.typeOfService;

    // const showDropDown =
    //     useAppSelector((state) => state.transportFormDropdown.typeOfService);
    // const dispatch = useAppDispatch();

    return (
        <div className="typeOfService">
            <h3>Тип услуги</h3>
            <div className="setting-typeOfService">
                {data &&
                    (data.params
                        .find((el) => el.name === 'transport_type_of_service') as ChoicesType).choices
                        .filter((el) => (el as SelectType).value && (el as SelectType).label)
                        .map((el) => (
                            <label className="form-checkbox" key={(el as SelectType).label}>
                                <input
                                    type="checkbox"
                                    value={(el as SelectType).value || ''}
                                    {...register('transport_type_of_service')}
                                />
                                <span>{(el as SelectType).label}</span>
                            </label>
                        )    
                    )
                }
            </div>
            {/* <div
                className="select-transportFilter" //сделать наверное общий класс для всех выпадающих
                onClick={() => dispatch(toggleDropdown('typeOfService'))}
            >
                {typeOfService || 'Не выбрано'}
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
                                {...register('typeOfService')}
                                onClick={() =>
                                    dispatch(toggleDropdown('typeOfService'))
                                }
                            />
                            {el}
                            {typeOfService === el && <Jackdaw />}
                        </label>
                    ))}
                </div>
            )} */}
        </div>
    );
};
