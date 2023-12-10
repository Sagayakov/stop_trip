import { Control, UseFormSetValue } from 'react-hook-form';
import { useMatchMedia } from '../../../app/hooks/useMatchMedia';
import { UniversalSelectDropdown } from '../../../entities/universalDropdown/UniversalSelectDropdown';
import { TypeOfCurrencyFilter } from '../../../widgets/settingForm/settingCurrency/libr/TypeOfCurrencyFilter';

interface Props {
    setValue: UseFormSetValue<TypeOfCurrencyFilter>;
    control: Control<TypeOfCurrencyFilter, string[]>;
}

export const ProposedCurrency = ({ control, setValue }: Props) => {
    const { isMobile } = useMatchMedia();
    const options = [{ value: 'options', label: 'options' }];

    return (
        <>
            <div className="proposedCurrency">
                <h3>Предлагаемая валюта</h3>
                <UniversalSelectDropdown
                    closeMenuOnSelect={false}
                    control={control}
                    isMulti={true}
                    name="proposed_currency"
                    options={options}
                    placeholder="Предлагаемая валюта"
                    prefix="filterCurrencyForm"
                    setValue={setValue}
                    isSearchable={!isMobile}
                />
            </div>
        </>
    );
};
