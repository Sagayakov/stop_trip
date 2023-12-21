import { SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import {
    FoodDelivery,
    FoodEstablishment,
    FoodType,
} from 'features/settingCategoryForm/settingFoodForm';
import { Reset } from 'shared/ui/icons/icons-tools/Reset.tsx';
import { TypeForFoodForm } from './libr/TypeForFoodForm';
import { searchParamsForFood } from './libr/searchParamsForFood';
import './libr/settingFoordForm.scss';
import { useTranslation } from 'react-i18next';
import { scrollToTop } from 'shared/utils/scrollToTop.ts';

interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

const SettingFoodForm = ({ setShowFilters }: Props) => {
    const { t } = useTranslation();

    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
    };
    const [, setSearchParams] = useSearchParams();

    const { register, handleSubmit, reset, setValue, control } =
        useForm<TypeForFoodForm>();


    const onsubmit: SubmitHandler<TypeForFoodForm> = (data) => {
        const { food_delivery, food_establishment, food_type } = data;

        const { delivery, establishment, type } = searchParamsForFood(
            food_delivery,
            food_establishment,
            food_type
        );
        setSearchParams(`category=food${type}${delivery}${establishment}`);

        setShowFilters(false);
        scrollToTop();
    };

    const onReset = () => {
        reset();
        scrollToTop()
    };

    return (
        <section className="filters" onClick={handleClick}>
            <form className="filterFoodForm" onSubmit={handleSubmit(onsubmit)}>
                <FoodType control={control} setValue={setValue} />
                <FoodDelivery register={register} />
                <FoodEstablishment register={register} />
                <input type="submit" value={t('filters.apply')} />
                <button className="reset-setting-form" onClick={onReset}>
                    <Reset color="#1F6FDE" />
                    {t('filters.reset')}
                </button>
            </form>
        </section>
    );
};

export default SettingFoodForm;
