import { SubmitHandler, useForm } from 'react-hook-form';
import {
    DurationOfWork,
    PriceOfJob,
    TypeOfJob,
    TypeOfPayment,
    WithExperience,
} from '../../../features/settingCategoryForm/settingJob/';
import { Reset } from '../../../shared/ui/icons/icons-tools/Reset';
import { TypesOfJobs } from './libr/TypesOfJobs';
import './libr/settingJobFilter.scss';

interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

export const SettingJobForm = ({ setShowFilters }: Props) => {
    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
    };

    const { register, handleSubmit, reset, setValue, control } =
        useForm<TypesOfJobs>();

    const onsubmit: SubmitHandler<TypesOfJobs> = (data) => {
        console.log(data);
        setShowFilters(false);
        reset();
    };

    const onReset = () => {
        reset();
    };

    return (
        <section className="filters" onClick={handleClick}>
            <form className="filterJobForm" onSubmit={handleSubmit(onsubmit)}>
                <TypeOfJob control={control} setValue={setValue} />
                <DurationOfWork control={control} setValue={setValue} />
                <TypeOfPayment control={control} setValue={setValue} />
                <PriceOfJob register={register} />
                <WithExperience register={register} />
                <input type="submit" value="Применить" />
                <button className="reset-setting-form" onClick={onReset}>
                    <Reset color="#1F6FDE" />
                    Сбросить фильтры
                </button>
            </form>
        </section>
    );
};
