import { Control, UseFormSetValue } from 'react-hook-form';
import { TypeSettingTaxi, Price } from 'widgets/settingForm/settingTaxi/libr/TypeSettingTaxi.ts';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingTaxi/libr/settingTaxiForm.module.scss';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import { useAppSelector } from 'app/store/hooks';
import { getDashOptions } from 'shared/utils';

interface Props {
    setValue: UseFormSetValue<TypeSettingTaxi>;
    control: Control<TypeSettingTaxi, string[]>;
    available_params: string[] | Price | undefined;
}

type SelectType = {
    value: string;
    label: string;
};

export const TypeOfTaxi = ({ control, setValue, available_params }: Props) => {
    const { data } = useGetFiltersQuery('');
    const [values, setValues] = useState<SelectType[]>([]);
    const { t } = useTranslation();
    const lang = useAppSelector((state) => state.setLang.lang);

    useEffect(() => {
        if (data && available_params) {
            const result = (data['document_type'] as SelectType[]).filter((el) =>
                (available_params as string[]).includes(
                    el.value
                )
            );

            setValues(result as SelectType[]);
        }
    }, [data, available_params]);

    const options = getDashOptions(lang, values);

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
                options={options}
                defaultValue={options.length === 1 ? options[0] : undefined}
            />
        </div>
    );
};
