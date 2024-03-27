import { UseFormRegister } from 'react-hook-form';
import { TypeSettingRealty } from 'widgets/settingForm/settingRealty/libr/TypeSettingRealty.ts';
import { useGetFiltersQuery } from 'app/api/fetchAdverts.ts';
import { useTranslation } from 'react-i18next';
import styles from 'widgets/settingForm/settingRealty/libr/settingRealty.module.scss';
import { useAppSelector } from 'app/store/hooks';
import { UniversalCheckboxGroup } from 'entity/universalEntites';

interface Props {
    register: UseFormRegister<TypeSettingRealty>;
}

type SelectType = {
    value: string;
    label: string;
};

export const Amenities = ({ register }: Props) => {
    const { data } = useGetFiltersQuery('');
    const { t } = useTranslation();
    const lang = useAppSelector((state) => state.setLang.lang);

    return (
        <div className={styles.amenities}>
            <h3>{t('filters.property_amenities')}</h3>
            <div className={styles.amenities_setting}>
                {data && (
                    <UniversalCheckboxGroup
                        className={styles.amenities_checkbox}
                        register={register}
                        checkboxValues={
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
                        name="property_amenities"
                    />
                )}
            </div>
        </div>
    );
};
