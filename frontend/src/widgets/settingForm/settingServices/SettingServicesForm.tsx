import { SubmitHandler, useForm } from 'react-hook-form';
import { HouseCall, SettingServicePrice } from '../../../features/settingCategoryForm/settingServices';
import { Reset } from '../../../shared/ui/icons/icons-tools/Reset';
import { TypeOfServicesForm } from './libr/TypeOfServicesForm';
import './libr/settingServicesForm.scss';

interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

export const SettingServicesForm = ({ setShowFilters }: Props) => {
    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
    };

    const { register, handleSubmit, reset } = useForm<TypeOfServicesForm>();

    const onsubmit: SubmitHandler<TypeOfServicesForm> = (data) => {
        console.log(data);
        setShowFilters(false);
        reset();
    };

    const onReset = () => {
        reset();
    };
    return (
        <section className="filters" onClick={handleClick}>
            <form
                className="filterServiceForm"
                onSubmit={handleSubmit(onsubmit)}
                autoComplete="off"
            >
                <HouseCall register={register} />
                <SettingServicePrice register={register}/>
                <input type="submit" value="Показать 100 объявлений" />
                <button className="reset-setting-form" onClick={onReset}>
                    <Reset color="#1F6FDE" />
                    Сбросить фильтры
                </button>
            </form>
        </section>
    );
};
