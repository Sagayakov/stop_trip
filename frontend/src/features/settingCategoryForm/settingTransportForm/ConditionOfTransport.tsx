import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { TypeSettingTransport } from '../../../widgets/settingForm/settingTransport/libr/TypeSettingTransport';
import { useGetFiltersQuery } from '../../../app/api/fetchAdverts';
import { ChoicesType, SelectType } from '../../../app/api/types/filtersType';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
    setValue: UseFormSetValue<TypeSettingTransport>;
}

export const ConditionOfTransport = ({ register }: Props) => {
    const { data } = useGetFiltersQuery('');

    return (
        <div className="condition">
            <h3>Состояние</h3>
            <div className="select-condition">
                {data &&
                    (data.params
                        .find((el) => el.name === 'transport_condition') as ChoicesType).choices
                        .filter((el) => (el as SelectType).value && (el as SelectType).label)
                        .map((el) => (
                            <label className="form-checkbox" key={(el as SelectType).label}>
                                <input
                                    type="checkbox"
                                    value={(el as SelectType).value || ''}
                                    {...register('transport_condition')}
                                />
                                <span>{(el as SelectType).label}</span>
                            </label>
                        )    
                    )
                }
            </div>
        </div>
    );
};
