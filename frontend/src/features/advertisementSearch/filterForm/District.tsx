import { Control, UseFormSetValue } from 'react-hook-form';
import { SearchFormTypes, SearchOptions } from 'pages/advertisementSearch/AdvertisementSearch.tsx';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingRealty/libr/settingRealty.module.scss';

interface Props {
    control: Control<SearchFormTypes>;
    setValue: UseFormSetValue<SearchFormTypes>;
}

export const District = (props: Props) => {
    const { setValue, control } = props;

    const { t } = useTranslation();
    const { data } = useGetFiltersQuery('');
    const [districtValues, setDistrictValues] = useState<SearchOptions[]>([]);

    useEffect(() => {
        if (data) {
            const result = (data['region'] as SearchOptions[]).filter(
                (el) => (el as SearchOptions).value && (el as SearchOptions).label
            );
            data && setDistrictValues(result as SearchOptions[]);
        }
    }, [data]);

    return (
        <div className={styles.propertyDistrict}>
            <h3>{t('filters.property_district')}</h3>
            <UniversalSelectDropdown<SearchFormTypes>
                setValue={setValue}
                control={control}
                name="region"
                prefix="filterForm"
                placeholder={t('filters.property_district')}
                closeMenuOnSelect={true}
                isMulti={false}
                options={districtValues}
                defaultValue={{
                    value: 'north-goa',
                    label: 'Северный Гоа',
                }}
            />
        </div>
    )
}