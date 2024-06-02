import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import { useGetAvailableFiltersQuery, useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'app/store/hooks.ts';
import { useTranslation } from 'react-i18next';
import { SearchFormTypes, SearchOptions } from 'pages/advertisementSearch/AdvertisementSearch.tsx';
import { Control, UseFormSetValue } from 'react-hook-form';
import styles from 'widgets/settingForm/settingRealty/libr/settingRealty.module.scss';

interface Props {
    control: Control<SearchFormTypes>;
    setValue: UseFormSetValue<SearchFormTypes>;
    watch: <T extends keyof SearchFormTypes>(name: T) => SearchFormTypes[T];
}

export const City = (props: Props) => {
    const { setValue, watch, control } = props;

    const { data } = useGetFiltersQuery('');
    const { t } = useTranslation();
    const [cityValues, setCityValues] = useState<SearchOptions[]>([]);
    const region = watch('region');
    const { data: availableData } = useGetAvailableFiltersQuery(
        `?region=${region || 'north-goa'}`
    );
    const lang = useAppSelector((state) => state.setLang.lang);

    useEffect(() => {
        if (data && availableData) {
            const result = (data['city'] as SearchOptions[]).filter((el) =>
                (availableData.available_params.city as string[]).includes(
                    el.value
                )
            );
            setCityValues(result as SearchOptions[]);
        }
    }, [data, availableData]);

    return (
        <div className={styles.propertyCity}>
            <h3>{t('filters.property_city')}</h3>
            <UniversalSelectDropdown<SearchFormTypes>
                setValue={setValue}
                control={control}
                name="city"
                prefix="filterForm"
                placeholder={t('filters.property_city')}
                closeMenuOnSelect={false}
                isMulti={true}
                options={
                    lang === 'ru'
                        ? cityValues
                        : cityValues.map((el) => ({
                            value: el.value,
                            label: `${el.value[0].toUpperCase()}${el.value.slice(
                                1
                            )}`,
                        }))
                }
            />
        </div>
    )
}