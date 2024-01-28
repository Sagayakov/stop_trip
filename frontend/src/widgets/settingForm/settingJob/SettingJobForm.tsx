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

interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

const SettingJobForm = ({ setShowFilters }: Props) => {
    const { t } = useTranslation();
    const [, setSearchParams] = useSearchParams();

    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
    };

    const { register, handleSubmit, reset, setValue, control } =
        useForm<TypesOfJobs>();

    const onsubmit: SubmitHandler<TypesOfJobs> = (data) => {
        const {
            job_type,
            job_payment_type,
            job_experience,
            job_duration,
            price,
        } = data;

        const filters = getSearchParams(
            job_type,
            job_payment_type,
            job_experience,
            job_duration,
            price
        );
        setSearchParams(`category=job${filters}&page=1`);

        setShowFilters(false);
        scrollToTop();
    };

    const onReset = () => {
        reset();
        scrollToTop();
    };

    return (
        <section className={formStyles.filters} onClick={handleClick}>
            <form
                className={styles.filterJobForm}
                onSubmit={handleSubmit(onsubmit)}
                id="form-setting-job"
            >
                <City control={control} setValue={setValue} />
                <TypeOfJob register={register} />
                <DurationOfWork control={control} setValue={setValue} />
                <TypeOfPayment control={control} setValue={setValue} />
                <PriceOfJob register={register} />
                <WithExperience register={register} />
                <input type="submit" value={t('filters.apply')} />
                <button
                    className={`${styles.reset_setting_form} ${formStyles.reset_setting_form}`}
                    onClick={onReset}
                >
                    <Reset color="#1F6FDE" />
                    {t('filters.reset')}
                </button>
            </form>
        </section>
    );
};

export default SettingJobForm;
