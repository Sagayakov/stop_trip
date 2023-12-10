import { Control, UseFormSetValue } from 'react-hook-form';
import { useMatchMedia } from '../../../app/hooks/useMatchMedia';
import { UniversalSelectDropdown } from '../../../entities/universalDropdown/UniversalSelectDropdown';
import { TypeOfDocumentFilter } from '../../../widgets/settingForm/settingDocument/libr/TypeOfDocumentFilter';

interface Props {
    setValue: UseFormSetValue<TypeOfDocumentFilter>;
    control: Control<TypeOfDocumentFilter, string[]>;
}

export const DocumentDuration = ({ control, setValue }: Props) => {
    const { isMobile } = useMatchMedia();
    const options = [{ value: 'options', label: 'options' }];

    return (
        <>
            <div className="documentDuration">
                <h3>Срок действия</h3>
                <UniversalSelectDropdown
                    closeMenuOnSelect
                    control={control}
                    isMulti={true}
                    name="document_duration"
                    options={options}
                    placeholder="Срок действия"
                    prefix="filterDocumentForm"
                    setValue={setValue}
                    isSearchable={!isMobile}
                />
            </div>
        </>
    );
};
