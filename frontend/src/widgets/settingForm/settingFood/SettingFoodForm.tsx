import { SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import {
    City,
    FoodDelivery,
    FoodEstablishment,
    FoodType,
} from 'features/settingCategoryForm/settingFoodForm';
import { Reset } from 'shared/ui/icons/icons-tools/Reset.tsx';
import { TypeForFoodForm } from './libr/TypeForFoodForm';
import { searchParamsForFood } from './libr/searchParamsForFood';
import { useTranslation } from 'react-i18next';
import { scrollToTop } from 'shared/utils/scrollToTop.ts';
import styles from './libr/settingFoordForm.module.scss';
import stylesForm from 'widgets/settingForm/forms/filtersForm.module.scss';
import { useGetFiltersQuery } from 'app/api/fetchAdverts';
import { getDefaultValues } from './libr/getDefaultValues';
import { District } from 'features/settingCategoryForm/settingFoodForm/District';
import { StickyButton } from 'features/stickyButton/StickyButton';

interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

const SettingFoodForm = ({ setShowFilters }: Props) => {
    const { t } = useTranslation();

    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
    };
    const [searchParams, setSearchParams] = useSearchParams();
    const { data } = useGetFiltersQuery('');
    const defaultValues = getDefaultValues(searchParams, data);

    const { register, handleSubmit, reset, setValue, control, watch } =
        useForm<TypeForFoodForm>({ defaultValues });

    const onsubmit: SubmitHandler<TypeForFoodForm> = (data) => {
        const { city, food_delivery, food_establishment, food_type } = data;

        const { foodCity, delivery, establishment, type } = searchParamsForFood(
            city,
            food_delivery,
            food_establishment,
            food_type
        );
        setSearchParams(
            `category=food${foodCity}${type}${delivery}${establishment}&page=1`
        );

        setShowFilters(false);
        scrollToTop();
    };

    const handleReset = () => {
        reset();
        setSearchParams('category=food&page=1');
        location.reload();
    };

    return (
        <section className={stylesForm.filters} onClick={handleClick}>
            <form
                className={styles.filterFoodForm}
                onSubmit={handleSubmit(onsubmit)}
                id="form-setting-food"
            >
                <District control={control} setValue={setValue} />
                <City control={control} setValue={setValue} watch={watch} />
                <FoodType control={control} setValue={setValue} />
                <FoodDelivery register={register} />
                <FoodEstablishment register={register} />
                <StickyButton />
                <button
                    className={`${stylesForm.reset_setting_form} ${styles.reset_setting_form}`}
                    onClick={handleReset}
                >
                    <Reset color="#1F6FDE" />
                    {t('filters.reset')}
                </button>
            </form>
        </section>
    );
};

export default SettingFoodForm;
