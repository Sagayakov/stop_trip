import { UseFormRegister } from 'react-hook-form';
import { TypeSettingTransport } from 'widgets/settingForm/settingTransport/libr/TypeSettingTransport.ts';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { useTranslation } from 'react-i18next';
import { UniversalRadioGroup } from 'entity/universalEntites/UniversalRadioGroup.tsx';
import styles from 'widgets/settingForm/settingTransport/libr/settingTransportForm.module.scss';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
}

interface Values {
    label: string | number;
    value: string | number;
}

export const TypeOfService = ({ register }: Props) => {
    const { data } = useGetFiltersQuery('');
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const [defaultParam, setDefaultParam] = useState<Values | undefined>();

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
                            data['transport_type_of_service'] as Values[]
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
