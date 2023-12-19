import {
    SettingCurrencyForm,
    SettingDocumentForm,
    SettingEventForm,
    SettingFoodForm,
    SettingJobForm,
    SettingMarketForm,
    SettingRealtyForm,
    SettingExcursionForm,
    SettingServicesForm,
    SettingTaxiForm,
    SettingTransportForm,
} from './lazyComponents.ts';
import { SetStateAction } from 'react';
import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';

interface Props {
    showFilters: boolean;
    setShowFilters: React.Dispatch<SetStateAction<boolean>>;
}

export const FilterForms = ({ showFilters, setShowFilters }: Props) => {
    const category = location.pathname.split('/')[1];
    const { isDesktop } = useMatchMedia();

    const handleClickFilterForm = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        setShowFilters(false);
    };
    const filterFormStyleMobile = {
        display: `${showFilters ? 'block' : 'none'}`,
        height: '115%', //мб немного увеличить, чтобы было вплотную к футеру
    };

    return (
        <div
            className="filter-form"
            onClick={handleClickFilterForm}
            style={isDesktop ? { display: 'block' } : filterFormStyleMobile}
        >
            {category === 'property' && (
                <SettingRealtyForm setShowFilters={setShowFilters} />
            )}
            {category === 'transport' && (
                <SettingTransportForm setShowFilters={setShowFilters} />
            )}
            {category === 'taxi' && (
                <SettingTaxiForm setShowFilters={setShowFilters} />
            )}
            {category === 'service' && (
                <SettingServicesForm setShowFilters={setShowFilters} />
            )}
            {category === 'job' && (
                <SettingJobForm setShowFilters={setShowFilters} />
            )}
            {category === 'event' && (
                <SettingEventForm setShowFilters={setShowFilters} />
            )}
            {category === 'exchange_rate' && (
                <SettingCurrencyForm setShowFilters={setShowFilters} />
            )}
            {category === 'document' && (
                <SettingDocumentForm setShowFilters={setShowFilters} />
            )}
            {category === 'excursion' && (
                <SettingExcursionForm setShowFilters={setShowFilters} />
            )}
            {category === 'food' && (
                <SettingFoodForm setShowFilters={setShowFilters} />
            )}
            {category === 'market' && (
                <SettingMarketForm setShowFilters={setShowFilters} />
            )}
        </div>
    );
};
