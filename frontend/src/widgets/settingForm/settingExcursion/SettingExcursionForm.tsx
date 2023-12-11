//SettingExcursionFilter
import { SubmitHandler, useForm } from 'react-hook-form';
import {
    ExcursionFood,
    ExcursionTransfer,
} from '../../../features/settingCategoryForm/settingExcursionForm';
import { Reset } from '../../../shared/ui/icons/icons-tools/Reset';
import { TypeForExcursionFilter } from './libr/TypeForExcursionFilter';
import './libr/settingExcursionFilter.scss';

interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

const SettingExcursionForm = ({ setShowFilters }: Props) => {
    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
    };

    const { handleSubmit, reset, register } = useForm<TypeForExcursionFilter>();

    const onSubmit: SubmitHandler<TypeForExcursionFilter> = (data) => {
        console.log(data);
        setShowFilters(false);
        reset();
    };

    const onReset = () => reset();

    return (
        <section className="filters" onClick={handleClick}>
            <form
                className="filterExcursionForm"
                onSubmit={handleSubmit(onSubmit)}
            >
                <ExcursionFood register={register} />
                <ExcursionTransfer register={register} />
                <input type="submit" value="Применить" />
                <button className="reset-setting-form" onClick={onReset}>
                    <Reset color="#1F6FDE" />
                    Сбросить фильтры
                </button>
            </form>
        </section>
    );
};

export default SettingExcursionForm;
