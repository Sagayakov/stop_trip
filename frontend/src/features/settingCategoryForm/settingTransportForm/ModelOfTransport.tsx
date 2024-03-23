import {
    Control,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
} from 'react-hook-form';
import { TypeSettingTransport } from 'widgets/settingForm/settingTransport/libr/TypeSettingTransport.ts';
import {
    useGetAvailableFiltersQuery,
    useGetFiltersQuery,
} from 'app/api/fetchAdverts.ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import styles from 'widgets/settingForm/settingTransport/libr/settingTransportForm.module.scss';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
    watch: UseFormWatch<TypeSettingTransport>;
    setValue: UseFormSetValue<TypeSettingTransport>;
    control: Control<TypeSettingTransport, string[]>;
}

type SelectType = {
    value: string;
    label: string;
};

export const ModelOfTransport = ({ watch, setValue, control }: Props) => {
    const region = watch('region');
    const city = watch('city');
    const markOfTransport = watch('transport_brand');

    const disabled = markOfTransport && markOfTransport.length ? false : true;
    const { data } = useGetFiltersQuery('');
    const [modelOfTransportValues, setModelOfTransportValues] = useState<
        SelectType[]
    >([]);
    const { t } = useTranslation();
    const { data: availableData } = useGetAvailableFiltersQuery(
        `?region=${region || 'north-goa'}${city ? `&city=${city}` : ''}${
            markOfTransport ? `&transport_brand=${markOfTransport}` : ''
        }`
    );

    useEffect(() => {
        if (data && availableData) {
            const result = (data['transport_model'] as SelectType[]).filter(
                (el) =>
                    (
                        availableData.available_params
                            .transport_model as string[]
                    ).includes(el.value)
            );
            setModelOfTransportValues(result as SelectType[]);
        }
    }, [data, availableData]);

    return (
        <div className={styles.model}>
            <h3>{t('filters.transport_model')}</h3>
            <UniversalSelectDropdown
                setValue={setValue}
                control={control}
                name="transport_model"
                prefix="filterForm"
                placeholder={t('filters.transport_model')}
                closeMenuOnSelect={false}
                isDisabled={disabled}
                isMulti={true}
                options={modelOfTransportValues}
            />
        </div>
    );
};
