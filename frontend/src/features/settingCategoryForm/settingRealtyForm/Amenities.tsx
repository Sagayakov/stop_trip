import { Control, UseFormSetValue } from 'react-hook-form';
import { TypeSettingRealty } from 'widgets/settingForm/settingRealty/libr/TypeSettingRealty.ts';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { SelectType } from 'app/api/types/filtersType.ts';
import { useTranslation } from 'react-i18next';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import styles from 'widgets/settingForm/settingRealty/libr/settingRealty.module.scss';

interface Props {
    setValue: UseFormSetValue<TypeSettingRealty>;
    control: Control<TypeSettingRealty, string[]>;
}

export const Amenities = ({ setValue, control }: Props) => {
    const { data } = useGetFiltersQuery('');
    const { t } = useTranslation();

    return (
        <div className={styles.amenities}>
            <h3>{t('filters.property_amenities')}</h3>
            <div className={styles.amenities_setting}>
                {data && (
                    <UniversalSelectDropdown<TypeSettingRealty>
                        control={control}
                        setValue={setValue}
                        closeMenuOnSelect={false}
                        isMulti={true}
                        placeholder={t('filters.property_amenities')}
                        name="property_amenities"
                        prefix="filterForm"
                        options={data['property_amenities'] as SelectType[]}
                    />
                )}
            </div>
        </div>
    );
};
