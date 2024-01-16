import { Control, UseFormSetValue } from 'react-hook-form';
import { TypeSettingTransport } from 'widgets/settingForm/settingTransport/libr/TypeSettingTransport.ts';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { SelectType } from 'app/api/types/filtersType.ts';
import { useTranslation } from 'react-i18next';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import { ProductType } from 'pages/advertPage/libr/types.ts';
import { useEffect, useState } from 'react';
import styles from 'widgets/settingForm/settingTransport/libr/settingTransportForm.module.scss';

interface Props {
    control: Control<TypeSettingTransport, string[]>;
    setValue: UseFormSetValue<TypeSettingTransport>;
}
interface ChoicesType {
    name: keyof ProductType;
    choices: SelectType[];
}

export const EngineType = ({ control, setValue }: Props) => {
    const { data } = useGetFiltersQuery('');
    const [engineTypeValues, setEngineTypeValues] = useState<SelectType[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        if (data) {
            const result = (
                data.params.find(
                    (el) => el.name === 'transport_engine_type'
                ) as ChoicesType
            ).choices.filter(
                (el) => (el as SelectType).value && (el as SelectType).label
            );
            data && setEngineTypeValues(result as SelectType[]);
        }
    }, [data]);
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
                options={engineTypeValues}
            />
        </div>
    );
};
