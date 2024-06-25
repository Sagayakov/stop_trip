import {
    Control,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
} from 'react-hook-form';
import { TypeSettingTransport, Price } from 'widgets/settingForm/settingTransport/libr/TypeSettingTransport.ts';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import styles from 'widgets/settingForm/settingTransport/libr/settingTransportForm.module.scss';
import { getDashOptions } from 'shared/utils';
import { useAppSelector } from 'app/store/hooks';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
    watch: UseFormWatch<TypeSettingTransport>;
    setValue: UseFormSetValue<TypeSettingTransport>;
    control: Control<TypeSettingTransport, string[]>;
    available_params: string[] | Price | undefined;
}

type SelectType = {
    value: string;
    label: string;
};

export const ModelOfTransport = ({ watch, setValue, control, available_params }: Props) => {
    const markOfTransport = watch('transport_brand');
    const disabled = markOfTransport && markOfTransport.length ? false : true;
    const { data } = useGetFiltersQuery('');
    const [modelOfTransportValues, setModelOfTransportValues] = useState<
        SelectType[]
    >([]);
    const { t } = useTranslation();
    const lang = useAppSelector((state) => state.setLang.lang);

    useEffect(() => {
        if (data && available_params) {
            const result = (data['transport_model'] as SelectType[]).filter(
                (el) => (available_params as string[]).includes(el.value)
            );
            setModelOfTransportValues(result as SelectType[]);
        }
    }, [data, available_params]);

    const options = getDashOptions(lang, modelOfTransportValues);

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
                options={options}
                defaultValue={options.length === 1 ? options[0] : undefined}
            />
        </div>
    );
};
