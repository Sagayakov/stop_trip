import { Control, UseFormSetValue } from 'react-hook-form';
import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown';
import { TypeOfDocumentFilter } from 'widgets/settingForm/settingDocument/libr/TypeOfDocumentFilter.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingDocument/libr/settingDocumentForm.module.scss';
import { useEffect, useState } from 'react';
import { useGetFiltersQuery } from 'app/api/fetchAdverts';

interface Props {
    setValue: UseFormSetValue<TypeOfDocumentFilter>;
    control: Control<TypeOfDocumentFilter, string[]>;
}

type SelectOption = {
    value: string;
    label: string;
};

export const DocumentDuration = ({ control, setValue }: Props) => {
    const { isMobile } = useMatchMedia();
    const { t } = useTranslation();
    const { data } = useGetFiltersQuery('');
    const [values, setValues] = useState<SelectOption[]>([]);

    useEffect(() => {
        if (data) {
            const result = (data['document_duration'] as SelectOption[]).filter(
                (el) => (el as SelectOption).value && (el as SelectOption).label
            );

            setValues(result as SelectOption[]);
        }
    }, [data]);

    return (
        <>
            <div className={styles.documentDuration}>
                <h3>{t('filters.document_duration')}</h3>
                <UniversalSelectDropdown
                    closeMenuOnSelect={false}
                    control={control}
                    isMulti={true}
                    name="document_duration"
                    options={values}
                    placeholder={t('filters.document_duration')}
                    prefix="filterForm"
                    setValue={setValue}
                    isSearchable={!isMobile}
                />
            </div>
        </>
    );
};
