import { Control, UseFormSetValue } from 'react-hook-form';
import { TypeSettingTaxi } from 'widgets/settingForm/settingTaxi/libr/TypeSettingTaxi.ts';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { ChoicesType, SelectType } from 'app/api/types/filtersType.ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingTaxi/libr/settingTaxiForm.module.scss';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';

interface Props {
    setValue: UseFormSetValue<TypeSettingTaxi>;
    control: Control<TypeSettingTaxi, string[]>;
}

export const TypeOfTaxi = ({ control, setValue }: Props) => {
    const { data } = useGetFiltersQuery('');
    const [typeValues, setTypeValues] = useState<SelectType[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        if (data) {
            const result = (
                data.params.find((el) => el.name === 'taxi_type') as ChoicesType
            ).choices.filter(
                (el) => (el as SelectType).value && (el as SelectType).label
            );
            data && setTypeValues(result as SelectType[]);
        }
    }, [data]);

    return (
        <div className={styles.typeOfTaxi}>
            <h3>{t('filters.taxi_type')}</h3>
            <UniversalSelectDropdown
                setValue={setValue}
                control={control}
                name="taxi_type"
                prefix="filterForm"
                placeholder={t('filters.taxi_type')}
                closeMenuOnSelect={false}
                isMulti={true}
                options={typeValues}
            />
        </div>
    );
};
