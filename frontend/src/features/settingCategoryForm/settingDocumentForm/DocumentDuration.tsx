import { Control, UseFormSetValue } from 'react-hook-form';
import { useMatchMedia } from '../../../app/hooks/useMatchMedia';
import { UniversalSelectDropdown } from '../../../entities/universalDropdown/UniversalSelectDropdown';
import { TypeOfDocumentFilter } from '../../../widgets/settingForm/settingDocument/libr/TypeOfDocumentFilter';
import { useTranslation } from 'react-i18next';

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
            <div className="documentDuration">
                <h3>{t('filters.validity')}</h3>
                <UniversalSelectDropdown
                    closeMenuOnSelect={false}
                    control={control}
                    isMulti={true}
                    name="document_duration"
                    options={options}
                    placeholder={t('filters.validity')}
                    prefix="filterDocumentForm"
                    setValue={setValue}
                    isSearchable={!isMobile}
                />
            </div>
        </>
    );
};
