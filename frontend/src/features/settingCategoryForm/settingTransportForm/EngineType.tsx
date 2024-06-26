import { Control, UseFormSetValue } from 'react-hook-form';
import { TypeSettingTransport, Price } from 'widgets/settingForm/settingTransport/libr/TypeSettingTransport.ts';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { useTranslation } from 'react-i18next';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import { useEffect, useState } from 'react';
import styles from 'widgets/settingForm/settingTransport/libr/settingTransportForm.module.scss';
import { useAppSelector } from 'app/store/hooks';
import { getDashOptions } from 'shared/utils';

interface Props {
    control: Control<TypeSettingTransport, string[]>;
    setValue: UseFormSetValue<TypeSettingTransport>;
    available_params: string[] | Price | undefined;
}

type SelectType = {
    value: string;
    label: string;
};

export const EngineType = ({ control, setValue, available_params }: Props) => {
    const { data } = useGetFiltersQuery('');
    const [engineTypeValues, setEngineTypeValues] = useState<SelectType[]>([]);
    const { t } = useTranslation();
    const lang = useAppSelector((state) => state.setLang.lang);

    useEffect(() => {
        if (data && available_params) {
            const result = ( data['transport_engine_type'] as SelectType[] ).filter(
                (el) => (available_params as string[]).includes(el.value)
            );
            setEngineTypeValues(result as SelectType[]);
        }
    }, [data, available_params]);

    const options = getDashOptions(lang, engineTypeValues);

    return (
        <div className={styles.engineType}>
            <h3>{t('filters.transport_engine_type')}</h3>
            <UniversalSelectDropdown
                setValue={setValue}
                control={control}
                name="transport_engine_type"
                prefix="filterForm"
                placeholder={t('filters.transport_engine_type')}
                closeMenuOnSelect={false}
                isMulti={true}
                options={options}
                defaultValue={options.length === 1 ? options[0] : undefined}
            />
        </div>
    );
};
