import { UseFormRegister } from 'react-hook-form';
import { TypeSettingTransport } from '../../../widgets/settingForm/settingTransport/libr/TypeSettingTransport';
import { useGetFiltersQuery } from '../../../app/api/fetchAdverts';
import { ChoicesType, SelectType } from '../../../app/api/types/filtersType';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
}

export const TransmissionType = ({ register }: Props) => {
    const { data } = useGetFiltersQuery('');
    const { t } = useTranslation();

    return (
        <div className="transmissionType">
            <h3>{t('filters.transmission')}</h3>
            <div className="select-transmissionType">
                {data &&
                    (
                        data.params.find(
                            (el) => el.name === 'transport_transmission_type'
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
                                    {...register('transport_transmission_type')}
                                />
                                <span>{(el as SelectType).label}</span>
                            </label>
                        ))}
            </div>
        </div>
    );
};
