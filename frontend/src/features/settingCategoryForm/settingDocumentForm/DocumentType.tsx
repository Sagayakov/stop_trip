import { Control, UseFormSetValue } from 'react-hook-form';
import { useMatchMedia } from '../../../app/hooks/useMatchMedia';
import { UniversalSelectDropdown } from '../../../entities/universalDropdown/UniversalSelectDropdown';
import { TypeOfDocumentFilter } from '../../../widgets/settingForm/settingDocument/libr/TypeOfDocumentFilter';

interface Props {
    setValue: UseFormSetValue<TypeOfDocumentFilter>;
    control: Control<TypeOfDocumentFilter, string[]>;
}

export const DocumentType = ({ control, setValue }: Props) => {
    const { isMobile } = useMatchMedia();
    const options = [
        { value: 'tourist-visa', label: 'Туристская виза' },
        { value: 'business-visa', label: 'Бизнес-виза' },
        { value: 'c-form', label: 'C-форма' },
        { value: 'exit-permit', label: 'Продление выезда' },
        { value: 'other', label: 'Другое' },
    ];

    return (
        <>
            <div className="documentType">
                <h3>Тип документа</h3>
                <UniversalSelectDropdown
                    closeMenuOnSelect={false}
                    control={control}
                    isMulti={true}
                    name="document_type"
                    options={options}
                    placeholder="Тип документа"
                    prefix="filterDocumentForm"
                    setValue={setValue}
                    isSearchable={!isMobile}
                />
            </div>
        </>
    );
};
