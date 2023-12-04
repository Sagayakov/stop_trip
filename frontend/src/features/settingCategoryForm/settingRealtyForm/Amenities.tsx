import { UseFormRegister } from 'react-hook-form';
import { TypeSettingRealty } from '../../../widgets/settingForm/settingRealty/libr/TypeSettingRealty';
import { useGetFiltersQuery } from '../../../app/api/fetchAdverts';
import { ChoicesType, SelectType } from '../../../app/api/types/filtersType';

interface Props {
    register: UseFormRegister<TypeSettingRealty>;
}

export const Amenities = ({ register }: Props) => {
    const { data } = useGetFiltersQuery('');

    return (
        <div className="amenities">
            <h3>Удобства</h3>
            <div className="amenities-setting">
                {data &&
                    (data.params
                        .find((el) => el.name === 'property_amenities') as ChoicesType).choices
                        .filter((el) => (el as SelectType).value && (el as SelectType).label)
                        .map((el) => (
                            <label className="form-checkbox" key={(el as SelectType).label}>
                                <input
                                    type="checkbox"
                                    value={(el as SelectType).value || ''}
                                    {...register('property_amenities')}
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

/* import { UseFormRegister } from 'react-hook-form';
import { TypeSettingRealty } from '../../../widgets/settingForm/settingRealty/libr/TypeSettingRealty';

interface Props {
    register: UseFormRegister<TypeSettingRealty>;
}

export const Amenities = ({ register }: Props) => {
    return (
        <div className="amenities">
            <h3>Удобства</h3>
            <div className="amenities-setting">
                <textarea
                    {...register('property_amenities')}
                    placeholder="Пожалуйста, через запятую перечислите желаемые удобства"
                ></textarea>
            </div>
        </div>
    );
}; */
