import { UseFormRegister } from 'react-hook-form';
import { TypeSettingRealty } from '../../../widgets/settingForm/settingRealty/libr/TypeSettingRealty';
import { useGetFiltersQuery } from '../../../app/api/fetchAdverts';
import { ChoicesType, SelectType } from '../../../app/api/types/filtersType';

interface Props {
    register: UseFormRegister<TypeSettingRealty>;
}

export const Bathroom = ({ register }: Props) => {
    const { data } = useGetFiltersQuery('');

    return (
        <div className="bathroom">
            <h3>Санузел</h3>
            <div className="bathroom-setting">
            {data &&
                    (data.params
                        .find((el) => el.name === 'property_bathroom_type') as ChoicesType).choices
                        .filter((el) => (el as SelectType).value && (el as SelectType).label)
                        .map((el) => (
                            <label className="form-checkbox" key={(el as SelectType).label}>
                                <input
                                    type="checkbox"
                                    value={(el as SelectType).value || ''}
                                    {...register('property_bathroom_type')}
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
