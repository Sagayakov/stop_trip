import {
    Control,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
} from 'react-hook-form';
import { TypeSettingTransport } from 'widgets/settingForm/settingTransport/libr/TypeSettingTransport.ts';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
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
    const markOfTrasport = watch('transport_brand');
    const disabled = markOfTrasport && markOfTrasport.length ? false : true;
    const { data } = useGetFiltersQuery('');
    const [modelOfTransportValues, setModelOfTransportValues] = useState<
        SelectType[]
    >([]);
    const { t } = useTranslation();

    useEffect(() => {
        if (data) {
            const result = (data['transport_model'] as SelectType[]).filter(
                (el) => (el as SelectType).value && (el as SelectType).label
            );
            data && setModelOfTransportValues(result as SelectType[]);
        }
    }, [data]);

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
