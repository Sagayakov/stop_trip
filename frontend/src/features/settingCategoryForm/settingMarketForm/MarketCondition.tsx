import { UniversalCheckboxGroup } from '../../../entities/universalDropdown';
import { UseFormRegister } from 'react-hook-form';
import { TypeForMarketForm } from '../../../widgets/settingForm/settingMarket/libr/TypeForMarketForm';

interface Props {
    register: UseFormRegister<TypeForMarketForm>;
}
export const MarketCondition = ({ register }: Props) => {
    const values = [
        { value: 'new', label: 'Новое' },
        { value: 'used', label: 'Б/у' },
    ];
    return (
        <div className="marketCondition">
            <h3>Состояние</h3>
            <UniversalCheckboxGroup
                checkboxValues={values}
                register={register}
                name="market_condition"
            />
        </div>
    );
};
