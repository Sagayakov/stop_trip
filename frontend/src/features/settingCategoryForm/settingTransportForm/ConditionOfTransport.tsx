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
    value: string;
    label: string;
};

export const ConditionOfTransport = ({ setValue, control }: Props) => {
    const { data } = useGetFiltersQuery('');
    const { t } = useTranslation();
    const lang = useAppSelector((state) => state.setLang.lang);

    return (
        <div className={styles.condition}>
            <h3>{t('filters.transport_condition')}</h3>
            <div className={styles.select_condition}>
                {data && (
                    <UniversalSelectDropdown<TypeSettingTransport>
                        setValue={setValue}
                        control={control}
                        name="transport_condition"
                        prefix="filterForm"
                        placeholder={t('filters.transport_condition')}
                        closeMenuOnSelect={false}
                        isMulti={true}
                        options={
                            lang === 'ru'
                                ? (data.transport_condition as SelectType[])
                                : (
                                      data.transport_condition as SelectType[]
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
