import { Control, UseFormSetValue } from 'react-hook-form';
import { TypeSettingTransport } from 'widgets/settingForm/settingTransport/libr/TypeSettingTransport.ts';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { SelectType } from 'app/api/types/filtersType.ts';
import { useTranslation } from 'react-i18next';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import styles from 'widgets/settingForm/settingTransport/libr/settingTransportForm.module.scss';

interface Props {
    setValue: UseFormSetValue<TypeSettingTransport>;
    control: Control<TypeSettingTransport, string[]>;
}

export const ConditionOfTransport = ({ setValue, control }: Props) => {
    const { data } = useGetFiltersQuery('');
    const { t } = useTranslation();

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
                        options={data['transport_condition'] as SelectType[]}
                    />
                )}
            </div>
        </div>
    );
};
