import { UseFormRegister } from 'react-hook-form';
import { TypeForMarketForm } from 'widgets/settingForm/settingMarket/libr/TypeForMarketForm.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingMarket/libr/settingMarketForm.module.scss';
import { UniversalRadioGroup } from 'entity/universalEntites/UniversalRadioGroup';
import { useGetFiltersQuery } from 'app/api/fetchAdverts';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'app/store/hooks';

interface Props {
    register: UseFormRegister<TypeForMarketForm>;
}

interface Values {
    label: string;
    value: string;
}

export const MarketCondition = ({ register }: Props) => {
    const { t } = useTranslation();
    const { data } = useGetFiltersQuery('');
    const [searchParams] = useSearchParams();
    const [defaultParam, setDefaultParam] = useState<Values | undefined>();
    const lang = useAppSelector((state) => state.setLang.lang);

    useEffect(() => {
        if (data) {
            const conditionParam = searchParams.get('market_condition');
            const param = conditionParam
                ? {
                      value: conditionParam,
                      label: (data['market_condition'] as Values[]).find(
                          (item) => item.value === conditionParam
                      )!.label,
                  }
                : undefined;
            setDefaultParam(param);
        }
    }, [data, searchParams]);

    return (
        <div className={styles.marketCondition}>
            <h3>{t('filters.market_condition')}</h3>
            {data && (
                <UniversalRadioGroup
                    radioValues={
                        lang === 'ru'
                            ? (data['market_condition'] as Values[])
                            : (data['market_condition'] as Values[]).map(
                                  (el) => ({
                                      value: el.value,
                                      label: `${el.value[0].toUpperCase()}${el.value.slice(
                                          1
                                      )}`,
                                  })
                              )
                    }
                    register={register}
                    name="market_condition"
                    className={styles.checkbox_group}
                    defaultValue={defaultParam}
                />
            )}
        </div>
    );
};
