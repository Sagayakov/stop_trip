import { SubmitHandler, useForm } from 'react-hook-form';
import {
    SettingTaxiPrice,
    TypeOfTaxi,
    UnitOfMeasurement,
} from '../../../features/settingCategoryForm/settingTaxiForm/index';
import { Reset } from '../../../shared/ui/icons/icons-tools/Reset';
import { TypeSettingTaxi } from './libr/TypeSettingTaxi';
import './libr/settingTaxiForm.scss';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

const SettingTaxiForm = ({ setShowFilters }: Props) => {
    const [, setSearchParams] = useSearchParams();
    const { t } = useTranslation();

    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
    };

    const { register, handleSubmit, reset, setValue, control } =
        useForm<TypeSettingTaxi>();

    const onsubmit: SubmitHandler<TypeSettingTaxi> = (data) => {
        const { taxi_unit, taxi_type, price } = data;

        const priceMaxQuery = price.max ? `&price_max=${price.max}` : '';
        const priceMinQuery = price.min ? `&price_min=${price.min}` : '';
        const taxiUnitQuery = taxi_unit
            ? `&taxi_unit=${taxi_unit.map((el) => `${el}`).join(',')}`
            : '';
        const taxiTypeQuery = taxi_type
            ? `&taxi_type=${taxi_type.map((el) => `${el}`).join(',')}`
            : '';

        const filters = `${taxiUnitQuery}${taxiTypeQuery}${priceMinQuery}${priceMaxQuery}`;
        setSearchParams(`category=taxi${filters}`);

        setShowFilters(false);
    };

    const onReset = () => {
        reset();
    };

    return (
        <section className="filters" onClick={handleClick}>
            <form
                className="filterTaxiForm"
                onSubmit={handleSubmit(onsubmit)}
                autoComplete="off"
            >
                <UnitOfMeasurement control={control} setValue={setValue} />
                <TypeOfTaxi control={control} setValue={setValue} />
                <SettingTaxiPrice register={register} />
                <input type="submit" value={t('filters.apply')} />
                <button className="reset-setting-form" onClick={onReset}>
                    <Reset color="#1F6FDE" />
                    {t('filters.reset')}
                </button>
            </form>
        </section>
    );
};

export default SettingTaxiForm;
