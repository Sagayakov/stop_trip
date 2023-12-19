import { SubmitHandler, useForm } from 'react-hook-form';
import {
    HouseCall,
    SettingServicePrice,
} from 'features/settingCategoryForm/settingServices';
import { Reset } from 'shared/ui/icons/icons-tools/Reset.tsx';
import { TypeOfServicesForm } from './libr/TypeOfServicesForm';
import './libr/settingServicesForm.scss';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getSearchParams } from './libr/getSearchParams.ts'

interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

const SettingServicesForm = ({ setShowFilters }: Props) => {
    const [, setSearchParams] = useSearchParams();
    const { t } = useTranslation();

    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
    };
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const { register, handleSubmit, reset } = useForm<TypeOfServicesForm>();

    const onsubmit: SubmitHandler<TypeOfServicesForm> = (data) => {
        const { service_home_visit, price } = data;
        const filters = getSearchParams(service_home_visit, price)
        setSearchParams(`category=service${filters}`);
        setShowFilters(false);
        scrollToTop()
    };

    const onReset = () => {
        reset();
        scrollToTop()
    };

    return (
        <section className="filters" onClick={handleClick}>
            <form
                className="filterServiceForm"
                onSubmit={handleSubmit(onsubmit)}
                autoComplete="off"
            >
                <HouseCall register={register} />
                <SettingServicePrice register={register} />
                <input type="submit" value={t('filters.apply')} />
                <button className="reset-setting-form" onClick={onReset}>
                    <Reset color="#1F6FDE" />
                    {t('filters.reset')}
                </button>
            </form>
        </section>
    );
};

export default SettingServicesForm;
