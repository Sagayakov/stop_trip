import { Control, UseFormSetValue } from 'react-hook-form';
import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown';
import { TypeOfDocumentFilter, Price } from 'widgets/settingForm/settingDocument/libr/TypeOfDocumentFilter.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingDocument/libr/settingDocumentForm.module.scss';
import { useEffect, useState } from 'react';
import { useGetFiltersQuery } from 'app/api/fetchAdverts';
import { useAppSelector } from 'app/store/hooks';
import { getDashOptions } from 'shared/utils';

interface Props {
    setValue: UseFormSetValue<TypeOfDocumentFilter>;
    control: Control<TypeOfDocumentFilter, string[]>;
    available_params: string[] | Price | undefined;
}

type SelectOption = {
    value: string;
    label: string;
};

export const DocumentType = ({ control, setValue, available_params }: Props) => {
    const { isMobile } = useMatchMedia();
    const { t } = useTranslation();
    const { data } = useGetFiltersQuery('');
    const [values, setValues] = useState<SelectOption[]>([]);
    const lang = useAppSelector((state) => state.setLang.lang);

    useEffect(() => {
        if (data && available_params) {
            const result = (data['document_type'] as SelectOption[]).filter((el) =>
                (available_params as string[]).includes(
                    el.value
                )
            );

            setValues(result as SelectOption[]);
        }
    }, [data, available_params]);

    const options = getDashOptions(lang, values);

    return (
        <>
            <div className={styles.documentType}>
                <h3>{t('filters.document_type')}</h3>
                <UniversalSelectDropdown
                    closeMenuOnSelect={false}
                    control={control}
                    isMulti={true}
                    name="document_type"
                    options={options}
                    placeholder={t('filters.document_type')}
                    prefix="filterForm"
                    setValue={setValue}
                    isSearchable={!isMobile}
                    defaultValue={options.length === 1 ? options[0] : undefined}
                />
            </div>
        </>
    );
};
