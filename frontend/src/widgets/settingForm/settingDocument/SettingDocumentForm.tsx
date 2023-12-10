import { SubmitHandler, useForm } from 'react-hook-form';
import { Reset } from '../../../shared/ui/icons/icons-tools/Reset';
import { TypeOfDocumentFilter } from './libr/TypeOfDocumentFilter';
import { DocumentDuration, DocumentType } from '../../../features/settingCategoryForm/settingDocumentForm';
import './libr/settingDocumentForm.scss'

interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

const SettingDocumentForm = ({ setShowFilters }: Props) => {
    // const [, setSearchParams] = useSearchParams();

    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
    };

    const { handleSubmit, reset, setValue, control } = useForm<TypeOfDocumentFilter>();

    const onsubmit: SubmitHandler<TypeOfDocumentFilter> = (data) => {
        console.log(data)
        setShowFilters(true);
        // setShowFilters(false);
    };

    const onReset = () => {
        reset();
    };

    return (
        <section className="filters" onClick={handleClick}>
            <form className="filterDocumentForm" onSubmit={handleSubmit(onsubmit)}>
                <DocumentType control={control} setValue={setValue} />
                <DocumentDuration control={control} setValue={setValue} />
                <input type="submit" value="Применить" />
                <button className="reset-setting-form" onClick={onReset}>
                    <Reset color="#1F6FDE" />
                    Сбросить фильтры
                </button>
            </form>
        </section>
    );
};
export default SettingDocumentForm