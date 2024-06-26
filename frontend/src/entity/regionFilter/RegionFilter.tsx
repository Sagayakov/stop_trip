import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Control, FieldValues, Path, UseFormSetValue } from 'react-hook-form';
import { useGetRegionsByCountryQuery } from 'app/api/fetchAdverts.ts';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import { useAppSelector } from 'app/store/hooks';
import { getDashOptions } from 'shared/utils';
import styles from './regionFilter.module.scss';

interface Props<T extends FieldValues> {
    setValue: UseFormSetValue<T>;
    control: Control<T, string[]>;
    available_params: string[] | Price | undefined;
}

interface Price {
    min: number;
    max: number;
}

type SelectType = {
    value: string;
    label: string;
};

export const RegionFilter = <T extends FieldValues>({ control, setValue, available_params }: Props<T>) => {
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
                <h3 className={styles.heading}>{t('filters.property_district')}</h3>
                <UniversalSelectDropdown<T>
                    setValue={setValue}
                    control={control}
                    name={"region" as Path<T>}
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
