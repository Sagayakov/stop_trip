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
import { UniversalButton } from 'entities/universalEntites';

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
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const onsubmit: SubmitHandler<TypeSettingTransport> = (data) => {
        const filters = getTransportQuery(data);
        setSearchParams(`category=transport${filters}`);
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
                <DriveType setValue={setValue} control={control} />
                <YearOfProduction register={register} />
                <TransmissionType control={control} setValue={setValue} />
                <BodyTypeOfTransport setValue={setValue} control={control} />
                <ConditionOfTransport control={control} setValue={setValue} />
                <TransportCommission register={register} />
                <SettingTransportPrice register={register} />
                <input type="submit" value={t('filters.apply')} />
                <UniversalButton onClick={onReset} className="reset-setting-form">
                    <Reset color="#1F6FDE" />
                    {t('filters.reset')}
                </UniversalButton>
            </form>
        </section>
    );
};

export default SettingTransportForm;
