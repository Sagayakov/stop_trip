import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { getDefaultValue } from 'features/addAnnouncementForm/getDefaultValue.ts';
import { useEffect } from 'react';
import { useGetSelectOptionsQuery } from 'app/api/fetchAdverts.ts';
import { StringOptions } from 'app/api/types/selectOptionValues.ts';
import { useAppSelector } from 'app/store/hooks';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    defaultValue?: string | null | undefined;
    errors: FieldErrors<FormAddAnn>;
}

export const AnnouncementRealtyHouseType = ({
    setValue,
    control,
    defaultValue,
    errors,
}: Props) => {
    const { data } = useGetSelectOptionsQuery('');
    const { t } = useTranslation();
    const lang = useAppSelector((state) => state.setLang.lang);

    useEffect(() => {
        if (defaultValue) {
            setValue(
                'property_house_type',
                String(
                    getDefaultValue(defaultValue, data?.property_house_type)!
                        .value
                )
            );
        } //если есть значение по умолчанию, устанавливаем его. Если юзер поменяет выбор, то установится новое значение
    }, [data?.property_house_type, defaultValue]);

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.property_house_type')}:</h3>
            <UniversalSelectDropdown<FormAddAnn>
                closeMenuOnSelect={true}
                control={control}
                isMulti={false}
                name="property_house_type"
                options={
                    lang === 'ru'
                        ? data?.property_house_type
                        : data?.property_house_type.map((el) => ({
                              value: el.value,
                              label: `${el.value[0].toUpperCase()}${el.value.slice(
                                  1
                              )}`,
                          }))
                }
                placeholder={t('filters.property_house_type')}
                defaultValue={
                    getDefaultValue(
                        defaultValue,
                        data?.property_house_type
                    ) as StringOptions
                }
                prefix="filterAnnouncementCategory"
                setValue={setValue}
            />
            <div className={styles.ann_field_err}>
                {errors?.property_house_type &&
                    errors.property_house_type.message}
            </div>
        </div>
    );
};
