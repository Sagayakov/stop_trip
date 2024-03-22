import { Control, UseFormSetValue } from 'react-hook-form';
import { TypeSettingRealty } from 'widgets/settingForm/settingRealty/libr/TypeSettingRealty.ts';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { useTranslation } from 'react-i18next';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import styles from 'widgets/settingForm/settingRealty/libr/settingRealty.module.scss';
import { useAppSelector } from 'app/store/hooks';

interface Props {
    setValue: UseFormSetValue<TypeSettingRealty>;
    control: Control<TypeSettingRealty, string[]>;
}

type SelectType = {
    value: string;
    label: string;
};

export const Amenities = ({ setValue, control }: Props) => {
    const { data } = useGetFiltersQuery('');
    const { t } = useTranslation();
    const lang = useAppSelector((state) => state.setLang.lang);

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
                        options={
                            lang === 'ru'
                                ? (data.property_amenities as SelectType[])
                                : (data.property_amenities as SelectType[]).map(
                                      (el) => ({
                                          value: el.value,
                                          label: `${el.value[0].toUpperCase()}${el.value.slice(
                                              1
                                          )}`,
                                      })
                                  )
                        }
                    />
                )}
            </div>
        </div>
    );
};
