import { Control, UseFormSetValue } from 'react-hook-form';
import { TypeSettingTransport } from 'widgets/settingForm/settingTransport/libr/TypeSettingTransport.ts';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { useTranslation } from 'react-i18next';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import styles from 'widgets/settingForm/settingTransport/libr/settingTransportForm.module.scss';
import { useAppSelector } from 'app/store/hooks';

interface Props {
    setValue: UseFormSetValue<TypeSettingTransport>;
    control: Control<TypeSettingTransport, string[]>;
}

type SelectType = {
    label: string;
    value: string;
};

export const TransmissionType = ({ setValue, control }: Props) => {
    const { data } = useGetFiltersQuery('');
    const { t } = useTranslation();
    const lang = useAppSelector((state) => state.setLang.lang);

    return (
        <div className={styles.transmissionType}>
            <h3>{t('filters.transport_transmission_type')}</h3>
            <div className={styles.select_transmissionType}>
                {data && (
                    <UniversalSelectDropdown<TypeSettingTransport>
                        setValue={setValue}
                        control={control}
                        name="transport_transmission_type"
                        prefix="filterForm"
                        placeholder={t('filters.transport_transmission_type')}
                        closeMenuOnSelect={false}
                        isMulti={true}
                        options={
                            lang === 'ru'
                                ? (data.transport_transmission_type as SelectType[])
                                : (
                                      data.transport_transmission_type as SelectType[]
                                  ).map((el) => ({
                                      value: el.value,
                                      label: `${el.value[0].toUpperCase()}${el.value.slice(
                                          1
                                      )}`,
                                  }))
                        }
                    />
                )}
            </div>
        </div>
    );
};
