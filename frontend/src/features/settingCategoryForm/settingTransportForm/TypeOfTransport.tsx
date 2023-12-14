import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { TypeSettingTransport } from '../../../widgets/settingForm/settingTransport/libr/TypeSettingTransport';
import { useGetFiltersQuery } from '../../../app/api/fetchAdverts';
import { ChoicesType, SelectType } from '../../../app/api/types/filtersType';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
    watch: UseFormWatch<TypeSettingTransport>;
}
export const TypeOfTransport = ({ register }: Props) => {
    const { data } = useGetFiltersQuery('');
    const { t } = useTranslation();

    return (
        <div className="typeOfTransport">
            <h3>{t('filters.transport-type')}</h3>
            <div className="setting-typeOfTransport">
                {data &&
                    (
                        data.params.find(
                            (el) => el.name === 'transport_type'
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
                                    {...register('transport_type')}
                                />
                                <span>{(el as SelectType).label}</span>
                            </label>
                        ))}
            </div>
        </div>
    );
};
