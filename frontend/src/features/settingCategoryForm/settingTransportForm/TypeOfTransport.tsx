import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { TypeSettingTransport } from 'widgets/settingForm/settingTransport/libr/TypeSettingTransport.ts';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { useTranslation } from 'react-i18next';
import { UniversalRadioGroup } from 'entity/universalEntites/UniversalRadioGroup.tsx';
import styles from 'widgets/settingForm/settingTransport/libr/settingTransportForm.module.scss';

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
    watch: UseFormWatch<TypeSettingTransport>;
}

interface Values {
    label: string | number;
    value: string | number;
}

export const TypeOfTransport = ({ register }: Props) => {
    const { data } = useGetFiltersQuery('');
    const { t } = useTranslation();

    return (
        <div className={styles.typeOfTransport}>
            <h3>{t('filters.transport_type')}</h3>
            <div className={styles.setting_typeOfTransport}>
                {data && (
                    <UniversalRadioGroup
                        register={register}
                        radioValues={data['transport_type'] as Values[]}
                        name="transport_type"
                        className={styles.radio_group}
                    />
                )}
            </div>
        </div>
    );
};
