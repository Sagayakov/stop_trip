import { SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import {
    City,
    DocumentDuration,
    DocumentType,
} from 'features/settingCategoryForm/settingDocumentForm';
import { Reset } from 'shared/ui/icons/icons-tools/Reset.tsx';
import { TypeOfDocumentFilter } from './libr/TypeOfDocumentFilter';
import { searchParamsForDocument } from './libr/searchParamsForDocument';
import { useTranslation } from 'react-i18next';
import { scrollToTop } from 'shared/utils/scrollToTop.ts';
import styles from './libr/settingDocumentForm.module.scss';
import formStyles from 'widgets/settingForm/forms/filtersForm.module.scss';
import { useGetFiltersQuery } from 'app/api/fetchAdverts';
import { getDefaultValues } from './libr/getDefaultValues';

interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

const SettingDocumentForm = ({ setShowFilters }: Props) => {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    const { data } = useGetFiltersQuery('');
    const defaultValues = getDefaultValues(searchParams, data);

    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
    };

    const { handleSubmit, reset, setValue, control } =
        useForm<TypeOfDocumentFilter>({ defaultValues });

    const onsubmit: SubmitHandler<TypeOfDocumentFilter> = (data) => {
        const { city, document_duration, document_type } = data;

        const { documentCity, duration, types } = searchParamsForDocument(
            city,
            document_duration,
            document_type
        );

        setSearchParams(
            `category=document${documentCity}${types}${duration}&page=1`
        );

        setShowFilters(false);
        scrollToTop();
    };

    const handleReset = () => {
        reset();
        setSearchParams('category=document&page=1');
        location.reload();
    };

    return (
        <section className={formStyles.filters} onClick={handleClick}>
            <form
                className={styles.filterDocumentForm}
                onSubmit={handleSubmit(onsubmit)}
                id="form-setting-document"
            >
                <City control={control} setValue={setValue} />
                <DocumentType control={control} setValue={setValue} />
                <DocumentDuration control={control} setValue={setValue} />
                <input type="submit" value={t('filters.apply')} />
                <button
                    className={`${styles.reset_setting_form} ${formStyles.reset_setting_form}`}
                    onClick={handleReset}
                >
                    <Reset color="#1F6FDE" />
                    {t('filters.reset')}
                </button>
            </form>
        </section>
    );
};
export default SettingDocumentForm;
