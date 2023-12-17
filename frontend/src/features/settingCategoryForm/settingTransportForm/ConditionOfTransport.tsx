import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { TypeSettingTransport } from 'widgets/settingForm/settingTransport/libr/TypeSettingTransport.ts';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { ChoicesType, SelectType } from 'app/api/types/filtersType.ts';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
    setValue: UseFormSetValue<TypeSettingTransport>;
}

export const ConditionOfTransport = ({ register }: Props) => {
    const { data } = useGetFiltersQuery('');
    const { t } = useTranslation();

    return (
        <div className="condition">
            <h3>{t('filters.transport_condition')}</h3>
            <div className="select-condition">
                {data &&
                    (
                        data.params.find(
                            (el) => el.name === 'transport_condition'
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
                                    {...register('transport_condition')}
                                />
                                <span>{(el as SelectType).label}</span>
                            </label>
                        ))}
            </div>
        </div>
    );
};
