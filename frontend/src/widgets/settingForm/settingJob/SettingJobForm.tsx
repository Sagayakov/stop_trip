import { SubmitHandler, useForm } from 'react-hook-form';
import {
    City,
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
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { getDefaultValues } from './libr/getDefaultValues.ts';
import { District } from 'features/settingCategoryForm/settingJob/District.tsx';

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

    return (
        <section className={formStyles.filters} onClick={handleClick}>
            <form
                className={styles.filterJobForm}
                onSubmit={handleSubmit(onsubmit)}
                id="form-setting-job"
            >
                <District control={control} setValue={setValue} />
                <City control={control} setValue={setValue} watch={watch} />
                <TypeOfJob register={register} />
                <DurationOfWork control={control} setValue={setValue} />
                <TypeOfPayment control={control} setValue={setValue} />
                <PriceOfJob register={register} />
                <WithExperience register={register} />
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

export default SettingJobForm;
