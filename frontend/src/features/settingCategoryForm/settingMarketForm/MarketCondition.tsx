import { UniversalCheckboxGroup } from '../../../entities/universalDropdown';
import { UseFormRegister } from 'react-hook-form';
import { TypeForMarketForm } from '../../../widgets/settingForm/settingMarket/libr/TypeForMarketForm';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<TypeForMarketForm>;
}
export const MarketCondition = ({ register }: Props) => {
    const { t } = useTranslation();

    const values = [
        { value: 'new', label: `${t('filters.new')}` },
        { value: 'used', label: `${t('filters.used')}` },
    ];

    return (
        <div className="marketCondition">
            <h3>{t('filters.condition')}</h3>
            <UniversalCheckboxGroup
                checkboxValues={values}
                register={register}
                name="market_condition"
            />
        </div>
    );
};
