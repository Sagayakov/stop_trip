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
import './libr/settingJobFilter.scss';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getSearchParams } from './libr/getSearchParams.ts'
import { scrollToTop } from 'shared/utils/scrollToTop.ts';

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

        const filters = getSearchParams(job_type, job_payment_type, job_experience, job_duration, price)
        setSearchParams(`category=job${filters}`);

        setShowFilters(false);
        scrollToTop()
    };

    const onReset = () => {
        reset();
        scrollToTop()
    };

    return (
        <section className="filters" onClick={handleClick}>
            <form className="filterJobForm" onSubmit={handleSubmit(onsubmit)}>
                <TypeOfJob register={register} />
                <DurationOfWork control={control} setValue={setValue} />
                <TypeOfPayment control={control} setValue={setValue} />
                <PriceOfJob register={register} />
                <WithExperience register={register} />
                <input type="submit" value={t('filters.apply')} />
                <button className="reset-setting-form" onClick={onReset}>
                    <Reset color="#1F6FDE" />
                    {t('filters.reset')}
                </button>
            </form>
        </section>
    );
};

export default SettingJobForm;
