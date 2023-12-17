import { UseFormRegister } from 'react-hook-form';
import { TypeSettingTransport } from 'widgets/settingForm/settingTransport/libr/TypeSettingTransport.ts';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { ChoicesType, SelectType } from 'app/api/types/filtersType.ts';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
}

export const TypeOfService = ({ register }: Props) => {
    const { data } = useGetFiltersQuery('');
    const { t } = useTranslation();

    return (
        <div className="typeOfService">
            <h3>{t('filters.transport_type_of_service')}</h3>
            <div className="setting-typeOfService">
                {data &&
                    (
                        data.params.find(
                            (el) => el.name === 'transport_type_of_service'
                        ) as ChoicesType
                    ).choices
                        .filter(
                            (el) =>
                                (el as SelectType).value &&
                                (el as SelectType).label
                        )
                        .map((el) => (
                            <label
                                className="form-checkbox"
                                key={(el as SelectType).label}
                            >
                                <input
                                    type="checkbox"
                                    value={(el as SelectType).value || ''}
                                    {...register('transport_type_of_service')}
                                />
                                <span>{(el as SelectType).label}</span>
                            </label>
                        ))}
            </div>
        </div>
    );
};
