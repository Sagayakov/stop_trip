import { Control, UseFormSetValue } from 'react-hook-form';
import { useMatchMedia } from '../../../app/hooks/useMatchMedia';
import { UniversalSelectDropdown } from '../../../entities/universalDropdown/UniversalSelectDropdown';
import { TypeOfCurrencyFilter } from '../../../widgets/settingForm/settingCurrency/libr/TypeOfCurrencyFilter';

interface Props {
    setValue: UseFormSetValue<TypeOfCurrencyFilter>;
    control: Control<TypeOfCurrencyFilter, string[]>;
}

export const ExchangeFor = ({ control, setValue }: Props) => {
    const { isMobile } = useMatchMedia();
    const options = [
        { value: 'EUR', label: 'Евро' },
        { value: 'RUB', label: 'Рубль' },
    ];

    return (
        <div className="exchangeFor">
            <h3>Обмен на</h3>
            <UniversalSelectDropdown<TypeOfCurrencyFilter>
                closeMenuOnSelect={false}
                control={control}
                isMulti={true}
                name="exchange_for"
                options={options}
                placeholder="Обмен на"
                prefix="filterCurrencyForm"
                setValue={setValue}
                isSearchable={!isMobile}
            />
        </div>
    );
};
