import { UseFormRegister } from 'react-hook-form';
import { TypeSettingTaxi } from 'widgets/settingForm/settingTaxi/libr/TypeSettingTaxi.ts';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UniversalRadioGroup } from 'entity/universalEntites/UniversalRadioGroup.tsx';
import styles from 'widgets/settingForm/settingTaxi/libr/settingTaxiForm.module.scss';
import { useSearchParams } from 'react-router-dom';

interface Props {
    register: UseFormRegister<TypeSettingTaxi>;
}
interface Options {
    value: string | number;
    label: string | number;
}

export const UnitOfMeasurement = ({ register }: Props) => {
    const { data } = useGetFiltersQuery('');
    const [unitValues, setUnitValues] = useState<Options[]>([]);
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const [defaultParam, setDefaultParam] = useState<Options | undefined>();

    useEffect(() => {
        if (data) {
            const result = (data['taxi_unit'] as Options[]).filter(
                (el) => (el as Options).value && (el as Options).label
            );
            data && setUnitValues(result as Options[]);

            const unitParam = searchParams.get('taxi_unit');
            const param = unitParam
                ? {
                      value: unitParam,
                      label: (data['taxi_unit'] as Options[]).find(
                          (item) => item.value === unitParam
                      )!.label,
                  }
                : undefined;
            setDefaultParam(param);
        }
    }, [data, searchParams]);

    return (
        <div className={styles.unitOfMeasurement}>
            <h3>{t('filters.taxi_unit')}</h3>
            <UniversalRadioGroup<TypeSettingTaxi>
                register={register}
                radioValues={unitValues}
                name="taxi_unit"
                className={styles.radio_group}
                defaultValue={defaultParam}
            />
        </div>
    );
};
