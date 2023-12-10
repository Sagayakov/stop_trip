import { SubmitHandler, useForm } from 'react-hook-form';
import { TypeForFoodForm } from './libr/TypeForFoodForm';
import './libr/settingFoordForm.scss'
import { Reset } from '../../../shared/ui/icons/icons-tools/Reset';
import { FoodDelivery, FoodEstablishment, FoodType } from '../../../features/settingCategoryForm/settingFoodForm';


interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

const SettingFoodForm = ({ setShowFilters }: Props) => {

    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
    };

    const { register, handleSubmit, reset, setValue, control } =
        useForm<TypeForFoodForm>();

    const onsubmit: SubmitHandler<TypeForFoodForm> = (data) => {
        console.log(data)
        setShowFilters(false);
    };

    const onReset = () => {
        reset();
    };

    return (
        <section className="filters" onClick={handleClick}>
            <form className="filterFoodForm" onSubmit={handleSubmit(onsubmit)}>
                <FoodType control={control} setValue={setValue} />
                <FoodDelivery register={register} />
                <FoodEstablishment register={register} />
                <input type="submit" value="Применить" />
                <button className="reset-setting-form" onClick={onReset}>
                    <Reset color="#1F6FDE" />
                    Сбросить фильтры
                </button>
            </form>
        </section>
    );
};

export default SettingFoodForm;
