import { Control, UseFormSetValue } from 'react-hook-form';
import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';
import { UniversalSelectDropdown } from 'entities/universalEntites/UniversalSelectDropdown';
import { TypeOfDocumentFilter } from 'widgets/settingForm/settingDocument/libr/TypeOfDocumentFilter.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingDocument/libr/settingDocumentForm.module.scss'

interface Props {
    setValue: UseFormSetValue<TypeOfDocumentFilter>;
    control: Control<TypeOfDocumentFilter, string[]>;
}

export const DocumentType = ({ control, setValue }: Props) => {
    const { isMobile } = useMatchMedia();
    const { t } = useTranslation();

    const options = [
        { value: 'tourist-visa', label: 'Туристская виза' },
        { value: 'business-visa', label: 'Бизнес-виза' },
        { value: 'c-form', label: 'C-форма' },
        { value: 'exit-permit', label: 'Продление выезда' },
        { value: 'other', label: 'Другое' },
    ];

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
                />
            </div>
        </>
    );
};
