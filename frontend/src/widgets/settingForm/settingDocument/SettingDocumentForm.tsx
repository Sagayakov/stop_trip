import { SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import {
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
import { useGetAvailableFiltersQuery, useGetFiltersQuery } from 'app/api/fetchAdverts';
import { getDefaultValues } from './libr/getDefaultValues';
import { StickyButton } from 'entity/stickyButton/StickyButton';
import { getLightFiltersQuery } from 'shared/utils/getLightFiltersQuery';
import { PriceFilter } from 'entity/priceFilter/PriceFilter';
import { CityFilter } from 'entity/cityFilter/CityFilter';
import { RegionFilter } from 'entity/regionFilter/RegionFilter';

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

    const query = getLightFiltersQuery({
        filters: ['region', 'city', 'document_type', 'document_duration', 'price'],
        watch,
    });
    const category = searchParams.get('category');
    const { data: availableData } = useGetAvailableFiltersQuery(`?category=${category}&${query}`);

    return (
        <section className={formStyles.filters} onClick={handleClick}>
            <form
                className={styles.filterDocumentForm}
                onSubmit={handleSubmit(onsubmit)}
                id="form-setting-document"
            >
                <RegionFilter
                    control={control}
                    setValue={setValue}
                    available_params={availableData?.available_params.region}
                />
                <CityFilter
                    control={control}
                    setValue={setValue}
                    available_params={availableData?.available_params.city}
                />
                <DocumentType
                    control={control}
                    setValue={setValue}
                    available_params={availableData?.available_params.document_type}
                />
                <DocumentDuration
                    control={control}
                    setValue={setValue}
                    available_params={availableData?.available_params.document_duration}
                />
                <PriceFilter
                    register={register}
                    available_params={availableData?.available_params.city}
                />
                {availableData && <StickyButton count={availableData.count} />}
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
