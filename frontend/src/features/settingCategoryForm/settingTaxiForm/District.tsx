import { Control, UseFormSetValue } from 'react-hook-form';
import { useGetRegionsByCountryQuery } from 'app/api/fetchAdverts.ts';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import { TypeSettingTaxi, Price } from 'widgets/settingForm/settingTaxi/libr/TypeSettingTaxi';
import styles from 'widgets/settingForm/settingTaxi/libr/settingTaxiForm.module.scss';
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

export const District = ({ control, setValue, available_params }: Props) => {
    const { data: regionsData } = useGetRegionsByCountryQuery('?country=india');
    const { t } = useTranslation();
    const lang = useAppSelector((state) => state.setLang.lang);

    const districtValues = useMemo<SelectType[] | undefined>(
        () => {
            if (regionsData && available_params) {
                return regionsData.map((el) => ({ value: el.slug, label: el.name })).filter((el) =>
                    (available_params as string[]).includes(
                        el.value
                    )
                )
            }
        },    
        [regionsData, available_params],
    );

    const options = getDashOptions(lang, districtValues);

    return (
        <>
            <div className={styles.propertyDistrict}>
                <h3>{t('filters.property_district')}</h3>
                <UniversalSelectDropdown<TypeSettingTaxi>
                    setValue={setValue}
                    control={control}
                    name="region"
                    prefix="filterForm"
                    placeholder={t('filters.property_district')}
                    closeMenuOnSelect={true}
                    isMulti={false}
                    options={options}
                    defaultValue={options.length === 1 ? options[0] : undefined}
                />
            </div>
        </>
    );
};
