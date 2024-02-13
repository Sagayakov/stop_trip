import { UseFormRegister } from 'react-hook-form';
import { TypeForMarketForm } from 'widgets/settingForm/settingMarket/libr/TypeForMarketForm.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingMarket/libr/settingMarketForm.module.scss';
import { UniversalRadioGroup } from 'entity/universalEntites/UniversalRadioGroup';
import { useGetFiltersQuery } from 'app/api/fetchAdverts';

interface Props {
    register: UseFormRegister<TypeForMarketForm>;
}

interface Values {
    label: string | number;
    value: string | number;
}

export const MarketCondition = ({ register }: Props) => {
    const { t } = useTranslation();
    const { data } = useGetFiltersQuery('');

    return (
        <div className={styles.marketCondition}>
            <h3>{t('filters.market_condition')}</h3>
            {data && (
                <UniversalRadioGroup
                    radioValues={data['market_condition'] as Values[]}
                    register={register}
                    name="market_condition"
                    className={styles.checkbox_group}
                />
            )}
        </div>
    );
};
