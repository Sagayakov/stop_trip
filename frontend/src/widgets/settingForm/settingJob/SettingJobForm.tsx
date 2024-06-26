import { SubmitHandler, useForm } from 'react-hook-form';
import {
    DurationOfWork,
    PriceOfJob,
    TypeOfJob,
    TypeOfPayment,
    WithExperience,
} from 'features/settingCategoryForm/settingJob';
import { Reset } from 'shared/ui/icons/icons-tools/Reset.tsx';
import { TypesOfJobs } from './libr/TypesOfJobs';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getSearchParams } from './libr/getSearchParams.ts';
import { scrollToTop } from 'shared/utils/scrollToTop.ts';
import formStyles from 'widgets/settingForm/forms/filtersForm.module.scss';
import styles from './libr/settingJobFilter.module.scss';
import { useGetAvailableFiltersQuery, useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { getDefaultValues } from './libr/getDefaultValues.ts';
import { StickyButton } from 'entity/stickyButton/StickyButton.tsx';
import { getLightFiltersQuery } from 'shared/utils/getLightFiltersQuery.ts';
import { CityFilter } from 'entity/cityFilter/CityFilter.tsx';
import { RegionFilter } from 'entity/regionFilter/RegionFilter.tsx';

interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

const SettingJobForm = ({ setShowFilters }: Props) => {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    const { data } = useGetFiltersQuery('');
    const defaultValues = getDefaultValues(searchParams, data);

    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
    };

    const { register, handleSubmit, reset, setValue, control, watch } =
        useForm<TypesOfJobs>({ defaultValues });

    const onsubmit: SubmitHandler<TypesOfJobs> = (data) => {
        const {
            city,
            job_type,
            job_payment_type,
            job_experience,
            job_duration,
            price,
        } = data;

        const filters = getSearchParams({
            city,
            job_type,
            job_payment_type,
            job_experience,
            job_duration,
            price,
        });
        setSearchParams(`category=job${filters}&page=1`);

        setShowFilters(false);
        scrollToTop();
    };

    const handleReset = () => {
        reset();
        setSearchParams('category=job&page=1');
        location.reload();
    };

    const query = getLightFiltersQuery({
        filters: ['region', 'city', 'job_type', 'job_payment_type', 'job_experience', 'job_duration', 'price'],
        watch,
    });
    const category = searchParams.get('category');
    const { data: availableData } = useGetAvailableFiltersQuery(`?category=${category}&${query}`);

    return (
        <section className={formStyles.filters} onClick={handleClick}>
            <form
                className={styles.filterJobForm}
                onSubmit={handleSubmit(onsubmit)}
                id="form-setting-job"
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
                <TypeOfJob register={register} />
                <DurationOfWork
                    control={control}
                    setValue={setValue}
                    available_params={availableData?.available_params.job_duration}
                />
                <TypeOfPayment
                    control={control}
                    setValue={setValue}
                    available_params={availableData?.available_params.job_duration}
                />
                <PriceOfJob
                    register={register}
                    available_params={availableData?.available_params.price}
                />
                <WithExperience register={register} />
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

export default SettingJobForm;
