import { City, District, Price, Category } from 'features/advertisementSearch';
import { useForm } from 'react-hook-form';
import { SearchFormTypes } from 'pages/advertisementSearch/AdvertisementSearch.tsx';
import { queryStringBuilder } from 'features/advertisementSearch/filterForm/queryStringBuilder.ts';
import { Reset } from 'shared/ui/icons/icons-tools/Reset.tsx';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import 'widgets/settingForm/forms/selectStyles.scss';
import styles from 'widgets/settingForm/settingRealty/libr/settingRealty.module.scss';
import formStyles from 'widgets/settingForm/forms/filtersForm.module.scss';

export const Filters = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();
    const { t } = useTranslation();
    const {
        control, setValue, watch, register, handleSubmit, reset,
    } = useForm<SearchFormTypes>();

    const onsubmit = (data: SearchFormTypes) => {
        const queryString = queryStringBuilder(searchParams, data);
        setSearchParams(queryString);
    };
    const handleReset = () => {
        reset();
        setSearchParams();
        location.reload();
    };

    return (
        <section className={formStyles.filters} onClick={(event) => event.stopPropagation()}>
            <form
                className={styles.filter_realty_form}
                onSubmit={handleSubmit(onsubmit)}
            >
                <Category control={control} setValue={setValue} />
                <District control={control} setValue={setValue} />
                <City
                    watch={watch}
                    control={control}
                    setValue={setValue}
                />
                <Price watch={watch} register={register} />
                <input type="submit" value={t('filters.apply')} />
                <button
                    type="button"
                    className={`${formStyles.reset_setting_form} ${styles.reset_setting_form}`}
                    onClick={handleReset}
                >
                    <Reset color="#1F6FDE" />
                    {t('filters.reset')}
                </button>
            </form>
        </section>
    )
}