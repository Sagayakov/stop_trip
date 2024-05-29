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
import { District } from 'features/settingCategoryForm/settingDocumentForm/District';
import { StickyButton } from 'features/stickyButton/StickyButton';
import { DocumentPrice } from 'features/settingCategoryForm/settingDocumentForm/DocumentPrice';

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

    const { handleSubmit, reset, setValue, control, watch, register } =
        useForm<TypeOfDocumentFilter>({ defaultValues });

    const onsubmit: SubmitHandler<TypeOfDocumentFilter> = (data) => {
        const { city, document_duration, document_type, price } = data;

        const { documentCity, duration, types, priceMaxQuery, priceMinQuery } = searchParamsForDocument(
            city,
            document_duration,
            document_type,
            price,
        );

        setSearchParams(
            `category=document${documentCity}${types}${duration}${priceMaxQuery}${priceMinQuery}&page=1`
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
                <District control={control} setValue={setValue} />
                <City control={control} setValue={setValue} watch={watch} />
                <DocumentType control={control} setValue={setValue} />
                <DocumentDuration control={control} setValue={setValue} />
                <DocumentPrice register={register} />
                <StickyButton />
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
