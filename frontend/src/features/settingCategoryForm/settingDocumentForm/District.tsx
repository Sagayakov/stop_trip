import { Control, UseFormSetValue } from 'react-hook-form';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import styles from 'widgets/settingForm/settingDocument/libr/settingDocumentForm.module.scss';
import { TypeOfDocumentFilter } from 'widgets/settingForm/settingDocument/libr/TypeOfDocumentFilter';
import { useAppSelector } from 'app/store/hooks';
import { getDashOptions } from 'shared/utils';

interface Props {
    setValue: UseFormSetValue<TypeOfDocumentFilter>;
    control: Control<TypeOfDocumentFilter, string[]>;
}

type SelectType = {
    value: string;
    label: string;
};

export const District = ({ control, setValue }: Props) => {
    const { data } = useGetFiltersQuery('');
    const [districtValues, setDistrictValues] = useState<SelectType[]>([]);
    const { t } = useTranslation();
    const lang = useAppSelector((state) => state.setLang.lang);

    useEffect(() => {
        if (data) {
            const result = (data['region'] as SelectType[]).filter(
                (el) => (el as SelectType).value && (el as SelectType).label
            );
            data && setDistrictValues(result as SelectType[]);
        }
    }, [data]);

    const options = getDashOptions(lang, districtValues);

    return (
        <>
            <div className={styles.propertyDistrict}>
                <h3>{t('filters.property_district')}</h3>
                <UniversalSelectDropdown<TypeOfDocumentFilter>
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
