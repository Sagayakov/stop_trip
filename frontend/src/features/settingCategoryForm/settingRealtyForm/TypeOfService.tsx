import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UseFormRegister } from 'react-hook-form';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { TypeSettingRealty } from 'widgets/settingForm/settingRealty/libr/TypeSettingRealty.ts';
import { UniversalRadioGroup } from 'entity/universalEntites/UniversalRadioGroup.tsx';
import styles from 'widgets/settingForm/settingRealty/libr/settingRealty.module.scss';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from 'app/store/hooks';

interface Props {
    register: UseFormRegister<TypeSettingRealty>;
}
interface Options {
    value: string;
    label: string;
}

export const TypeOfService = ({ register }: Props) => {
    const { data } = useGetFiltersQuery('');
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const [defaultParam, setDefaultParam] = useState<Options | undefined>();
    const lang = useAppSelector((state) => state.setLang.lang);

    useEffect(() => {
        if (data) {
            const typeParam = searchParams.get('property_type_of_service');
            const param = typeParam
                ? {
                      value: typeParam,
                      label: (
                          data['property_type_of_service'] as Options[]
                      ).find((item) => item.value === typeParam)!.label,
                  }
                : undefined;
            setDefaultParam(param);
        }
    }, [data, searchParams]);

    return (
        <>
            <div className={styles.typeOfService}>
                <h3>{t('filters.property_type_of_service')}</h3>
                {data && (
                    <UniversalRadioGroup
                        register={register}
                        radioValues={
                            lang === 'ru'
                                ? (data?.property_type_of_service as Options[])
                                : (
                                      data?.property_type_of_service as Options[]
                                  ).map((el) => ({
                                      value: el.value,
                                      label: `${el.value[0].toUpperCase()}${el.value.slice(
                                          1
                                      )}`,
                                  }))
                        }
                        name="property_type_of_service"
                        className={styles.radio_group}
                        defaultValue={defaultParam}
                    />
                )}
            </div>
        </>
    );
};
