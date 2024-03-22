import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { getDefaultValue } from 'features/addAnnouncementForm/getDefaultValue.ts';
import { useEffect } from 'react';
import { StringOptions } from 'app/api/types/selectOptionValues.ts';
import { useGetSelectOptionsQuery } from 'app/api/fetchAdverts.ts';
import { useAppSelector } from 'app/store/hooks';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    defaultValue?: string | null | undefined;
    errors: FieldErrors<FormAddAnn>;
}

export const AnnouncementRealtyPrepayment = ({
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
                'property_prepayment',
                String(
                    getDefaultValue(defaultValue, data?.property_prepayment)!
                        .value
                )
            );
        } //если есть значение по умолчанию, устанавливаем его. Если юзер поменяет выбор, то установится новое значение
    }, []);

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.property_prepayment')}:</h3>
            <UniversalSelectDropdown<FormAddAnn>
                closeMenuOnSelect={true}
                control={control}
                isMulti={false}
                name="property_prepayment"
                options={
                    lang === 'ru'
                        ? data?.property_prepayment
                        : data?.property_prepayment.map((el) => ({
                              value: el.value,
                              label: `${el.value[0].toUpperCase()}${el.value.slice(
                                  1
                              )}`,
                          }))
                }
                placeholder={t('filters.property_prepayment')}
                defaultValue={
                    getDefaultValue(
                        defaultValue,
                        data?.property_prepayment
                    ) as StringOptions
                }
                prefix="filterAnnouncementCategory"
                setValue={setValue}
            />
            <div className={styles.ann_field_err}>
                {errors?.property_prepayment &&
                    errors.property_prepayment.message}
            </div>
        </div>
    );
};
