import { SubmitHandler, useForm } from 'react-hook-form';
import {
    BodyTypeOfTransport,
    ConditionOfTransport,
    DriveType,
    EngineType,
    EngineCapacity,
    MarkOfTransport,
    ModelOfTransport,
    SettingTransportPrice,
    TransmissionType,
    TransportCommission,
    TransportationCategory,
    TypeOfService,
    TypeOfTransport,
    YearOfProduction,
} from 'features/settingCategoryForm/settingTransportForm';
import { Reset } from 'shared/ui/icons/icons-tools/Reset.tsx';
import '././libr/settingTransportForm.scss';
import { TypeSettingTransport } from './libr/TypeSettingTransport';
import { useSearchParams } from 'react-router-dom';
import { getTransportQuery } from 'shared/utils/getTransportQuery.ts';
import { useTranslation } from 'react-i18next';

interface Props {
    setShowFilters: (value: React.SetStateAction<boolean>) => void;
}

const SettingTransportForm = ({ setShowFilters }: Props) => {
    const [, setSearchParams] = useSearchParams();
    const { t } = useTranslation();

    const { register, handleSubmit, reset, watch, setValue, control } =
        useForm<TypeSettingTransport>();

    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
    };

    const onsubmit: SubmitHandler<TypeSettingTransport> = (data) => {
        const filters = getTransportQuery(data);
        setSearchParams(`category=transport${filters}`);
        setShowFilters(false);
    };

    const onReset = () => {
        reset();
    };

    return (
        <section className="filters" onClick={handleClick}>
            <form
                className="filter-transport-form"
                onSubmit={handleSubmit(onsubmit)}
                autoComplete="off"
            >
                <TypeOfService register={register} />
                <TypeOfTransport register={register} watch={watch} />
                <TransportationCategory setValue={setValue} control={control} />
                <MarkOfTransport setValue={setValue} control={control} />
                <ModelOfTransport
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    control={control}
                />
                <EngineType setValue={setValue} control={control} />
                <EngineCapacity register={register} />
                <DriveType register={register} setValue={setValue} />
                <YearOfProduction register={register} />
                <TransmissionType register={register} />
                <BodyTypeOfTransport setValue={setValue} control={control} />
                <ConditionOfTransport register={register} setValue={setValue} />
                <TransportCommission register={register} />
                <SettingTransportPrice register={register} />
                <input type="submit" value={t('filters.apply')} />
                <button className="reset-setting-form" onClick={onReset}>
                    <Reset color="#1F6FDE" />
                    {t('filters.reset')}
                </button>
            </form>
        </section>
    );
};

export default SettingTransportForm;
