import { UniversalCheckboxGroup } from 'entities/universalEntites';
import { UseFormRegister } from 'react-hook-form';
import { TypeForMarketForm } from 'widgets/settingForm/settingMarket/libr/TypeForMarketForm.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingMarket/libr/settingMarketForm.module.scss'

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
        <div className={styles.marketCondition}>
            <h3>{t('filters.market_condition')}</h3>
            <UniversalCheckboxGroup
                checkboxValues={values}
                register={register}
                name="market_condition"
                className={styles.checkbox_group}
            />
        </div>
    );
};
