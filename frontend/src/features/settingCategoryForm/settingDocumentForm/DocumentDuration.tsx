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

export const DocumentDuration = ({ control, setValue }: Props) => {
    const { isMobile } = useMatchMedia();
    const { t } = useTranslation();

    const options = [
        { value: 'month', label: 'Месяц' },
        { value: 'quarter', label: 'Квартал' },
        { value: 'year', label: 'Год' },
        { value: 'years_5', label: '5 лет' },
        { value: 'other', label: 'Другое' },
    ];

    return (
        <>
            <div className={styles.documentDuration}>
                <h3>{t('filters.document_duration')}</h3>
                <UniversalSelectDropdown
                    closeMenuOnSelect={false}
                    control={control}
                    isMulti={true}
                    name="document_duration"
                    options={options}
                    placeholder={t('filters.document_duration')}
                    prefix="filterForm"
                    setValue={setValue}
                    isSearchable={!isMobile}
                />
            </div>
        </>
    );
};
