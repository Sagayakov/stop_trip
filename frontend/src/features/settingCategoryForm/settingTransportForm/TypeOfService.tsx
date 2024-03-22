import { UseFormRegister } from 'react-hook-form';
import { TypeSettingTransport } from 'widgets/settingForm/settingTransport/libr/TypeSettingTransport.ts';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { useTranslation } from 'react-i18next';
import { UniversalRadioGroup } from 'entity/universalEntites/UniversalRadioGroup.tsx';
import styles from 'widgets/settingForm/settingTransport/libr/settingTransportForm.module.scss';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'app/store/hooks';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
}

interface Values {
    label: string;
    value: string;
}

export const TypeOfService = ({ register }: Props) => {
    const { data } = useGetFiltersQuery('');
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const [defaultParam, setDefaultParam] = useState<Values | undefined>();
    const lang = useAppSelector((state) => state.setLang.lang);

    useEffect(() => {
        if (data) {
            const typeParam = searchParams.get('transport_type_of_service');
            const param = typeParam
                ? {
                      value: typeParam,
                      label: (
                          data['transport_type_of_service'] as Values[]
                      ).find((item) => item.value === typeParam)!.label,
                  }
                : undefined;
            setDefaultParam(param);
        }
    }, [data, searchParams]);

    return (
        <div className={styles.typeOfService}>
            <h3>{t('filters.transport_type_of_service')}</h3>
            <div className={styles.setting_typeOfService}>
                {data && (
                    <UniversalRadioGroup
                        register={register}
                        radioValues={
                            lang === 'ru'
                                ? (data.transport_type_of_service as Values[])
                                : (
                                      data.transport_type_of_service as Values[]
                                  ).map((el) => ({
                                      value: el.value,
                                      label: `${el.value[0].toUpperCase()}${el.value.slice(
                                          1
                                      )}`,
                                  }))
                        }
                        name="transport_type_of_service"
                        className={styles.radio_group}
                        defaultValue={defaultParam}
                    />
                )}
            </div>
        </div>
    );
};
