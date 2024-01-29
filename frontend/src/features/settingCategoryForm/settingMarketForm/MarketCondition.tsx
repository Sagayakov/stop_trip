import { UseFormRegister } from 'react-hook-form';
import { TypeForMarketForm } from 'widgets/settingForm/settingMarket/libr/TypeForMarketForm.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingMarket/libr/settingMarketForm.module.scss';
import { UniversalRadioGroup } from 'entity/universalEntites/UniversalRadioGroup';
import { useGetFiltersQuery } from 'app/api/fetchAdverts';
import { ProductType } from 'pages/advertPage/libr/types';

interface Props {
    register: UseFormRegister<TypeForMarketForm>;
}

interface Values {
    label: string | number;
    value: string | number;
}

interface ChoicesType {
    name: keyof ProductType;
    choices: Values[];
}

export const MarketCondition = ({ register }: Props) => {
    const { t } = useTranslation();
    const { data } = useGetFiltersQuery('');

    const options = data?.params.find(
        (el) => el.name === 'market_condition'
    ) as ChoicesType;

    return (
        <div className={styles.marketCondition}>
            <h3>{t('filters.market_condition')}</h3>
            {data && (
                <UniversalRadioGroup
                    radioValues={options.choices}
                    register={register}
                    name="market_condition"
                    className={styles.checkbox_group}
                />
            )}
        </div>
    );
};
