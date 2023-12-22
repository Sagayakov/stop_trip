import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { TypeSettingTransport } from 'widgets/settingForm/settingTransport/libr/TypeSettingTransport.ts';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { useTranslation } from 'react-i18next';
import { UniversalRadioGroup } from 'entities/universalEntites/UniversalRadioGroup.tsx';
import { ProductType } from 'pages/advertPage/libr/types.ts';
import styles from 'widgets/settingForm/settingTransport/libr/settingTransportForm.module.scss'

interface Props {
    register: UseFormRegister<TypeSettingTransport>;
    watch: UseFormWatch<TypeSettingTransport>;
}
interface ChoicesType {
    name: keyof ProductType;
    choices: Values[];
}
interface Values{
    label: string | number
    value: string | number
}
export const TypeOfTransport = ({ register }: Props) => {
    const { data } = useGetFiltersQuery('');
    const { t } = useTranslation();

    const options = data?.params.find(
        (el) => el.name === 'transport_type'
    ) as ChoicesType;

    return (
        <div className={styles.typeOfTransport}>
            <h3>{t('filters.transport_type')}</h3>
            <div className={styles.setting_typeOfTransport}>
                {data && (
                    <UniversalRadioGroup
                        register={register}
                        radioValues={options.choices}
                        name="transport_type"
                        className={styles.radio_group}
                    />
                )}
            </div>
        </div>
    );
};
