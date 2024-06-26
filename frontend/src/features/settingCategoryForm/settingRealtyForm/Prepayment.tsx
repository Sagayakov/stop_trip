import { Control, UseFormSetValue } from 'react-hook-form';
import { TypeSettingRealty, Price } from 'widgets/settingForm/settingRealty/libr/TypeSettingRealty.ts';
import { useTranslation } from 'react-i18next';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import styles from 'widgets/settingForm/settingRealty/libr/settingRealty.module.scss';
import { useEffect, useState } from 'react';
import { useGetFiltersQuery } from 'app/api/fetchAdverts';
import { useAppSelector } from 'app/store/hooks';
import { getDashOptions } from 'shared/utils';

interface Props {
    setValue: UseFormSetValue<TypeSettingRealty>;
    control: Control<TypeSettingRealty, string[]>;
    available_params: string[] | { min: number; max: number } | Price | undefined;
}

type SelectType = {
    value: string;
    label: string;
};

export const Prepayment = ({ control, setValue, available_params }: Props) => {
    const { t } = useTranslation();
    const { data } = useGetFiltersQuery('');
    const [prepaymentValues, setPrepaymentValues] = useState<SelectType[]>([]);
    const lang = useAppSelector((state) => state.setLang.lang);
    
    useEffect(() => {
        if (data && available_params) {
            const result = (
                data['property_prepayment'] as SelectType[]
            ).filter((el) => (available_params as string[]).includes(el.value));
            setPrepaymentValues(result as SelectType[]);
        }
    }, [data, available_params]);

    const options = getDashOptions(lang, prepaymentValues);

    return (
        <>
            <div className={styles.prepayment}>
                <h3>{t('filters.property_prepayment')}</h3>
                <UniversalSelectDropdown<TypeSettingRealty>
                    setValue={setValue}
                    control={control}
                    name="property_prepayment"
                    prefix="filterForm"
                    placeholder={t('filters.property_prepayment')}
                    closeMenuOnSelect={false}
                    isMulti={true}
                    options={options}
                    defaultValue={options.length === 1 ? options[0] : undefined}
                />
            </div>
        </>
    );
};
