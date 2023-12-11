import { SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import {
    DocumentDuration,
    DocumentType,
} from '../../../features/settingCategoryForm/settingDocumentForm';
import { Reset } from '../../../shared/ui/icons/icons-tools/Reset';
import { TypeOfDocumentFilter } from './libr/TypeOfDocumentFilter';
import { searchParamsForDocument } from './libr/searchParamsForDocument';
import './libr/settingDocumentForm.scss';

interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

const SettingDocumentForm = ({ setShowFilters }: Props) => {
    const [, setSearchParams] = useSearchParams();

    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
    };
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const { handleSubmit, reset, setValue, control } =
        useForm<TypeOfDocumentFilter>();

    const onsubmit: SubmitHandler<TypeOfDocumentFilter> = (data) => {
        console.log(data)
        const { document_duration, document_type } = data;

        const { duration, types } = searchParamsForDocument(
            document_duration,
            document_type
        );

        setSearchParams(`category=document${types}${duration}`);

        setShowFilters(false);
        scrollToTop();
    };

    const onReset = () => {
        reset();
    };

    return (
        <section className="filters" onClick={handleClick}>
            <form
                className="filterDocumentForm"
                onSubmit={handleSubmit(onsubmit)}
            >
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
export default SettingDocumentForm;
