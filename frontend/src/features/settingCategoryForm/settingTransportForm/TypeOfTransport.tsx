import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { TypeSettingTransport } from 'widgets/settingForm/settingTransport/libr/TypeSettingTransport.ts';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { useTranslation } from 'react-i18next';
import { UniversalRadioGroup } from 'entity/universalEntites/UniversalRadioGroup.tsx';
import styles from 'widgets/settingForm/settingTransport/libr/settingTransportForm.module.scss';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from 'app/store/hooks';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
    watch: UseFormWatch<TypeSettingTransport>;
}

interface Values {
    label: string;
    value: string;
}

export const TypeOfTransport = ({ register }: Props) => {
    const { data } = useGetFiltersQuery('');
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const [defaultParam, setDefaultParam] = useState<Values | undefined>();
    const lang = useAppSelector((state) => state.setLang.lang);

    useEffect(() => {
        if (data) {
            const typeParam = searchParams.get('transport_type');
            const param = typeParam
                ? {
                      value: typeParam,
                      label: (data['transport_type'] as Values[]).find(
                          (item) => item.value === typeParam
                      )!.label,
                  }
                : undefined;
            setDefaultParam(param);
        }
    }, [data, searchParams]);

    return (
        <div className={styles.typeOfTransport}>
            <h3>{t('filters.transport_type')}</h3>
            <div className={styles.setting_typeOfTransport}>
                {data && (
                    <UniversalRadioGroup
                        register={register}
                        radioValues={
                            lang === 'ru'
                                ? (data.transport_type as Values[])
                                : (data.transport_type as Values[]).map(
                                      (el) => ({
                                          value: el.value,
                                          label: `${el.value[0].toUpperCase()}${el.value.slice(
                                              1
                                          )}`,
                                      })
                                  )
                        }
                        name="transport_type"
                        className={styles.radio_group}
                        defaultValue={defaultParam}
                    />
                )}
            </div>
        </div>
    );
};
