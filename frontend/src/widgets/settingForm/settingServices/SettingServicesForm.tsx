import { SubmitHandler, useForm } from 'react-hook-form';
import { HouseCall, SettingServicePrice } from '../../../features/settingCategoryForm/settingServices';
import { Reset } from '../../../shared/ui/icons/icons-tools/Reset';
import { TypeOfServicesForm } from './libr/TypeOfServicesForm';
import './libr/settingServicesForm.scss';
import { useSearchParams } from 'react-router-dom';

interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

const SettingServicesForm = ({ setShowFilters }: Props) => {
    const [, setSearchParams] = useSearchParams();
    
    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
    };

    const { register, handleSubmit, reset } = useForm<TypeOfServicesForm>();

    const onsubmit: SubmitHandler<TypeOfServicesForm> = (data) => {
        const { service_home_visit, price } = data;
        
        const homeVisitQuery = service_home_visit ? `&service_home_visit=true` : '';
        const priceMaxQuery = price.max ? `&price_max=${price.max}` : '';
        const priceMinQuery = price.min ? `&price_min=${price.min}` : '';

        const filters = `${homeVisitQuery}${priceMinQuery}${priceMaxQuery}`;
        setSearchParams(`category=service${filters}`);

        setShowFilters(false);
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
                <input type="submit" value="Применить" />
                <button className="reset-setting-form" onClick={onReset}>
                    <Reset color="#1F6FDE" />
                    Сбросить фильтры
                </button>
            </form>
        </section>
    );
};

export default SettingServicesForm;