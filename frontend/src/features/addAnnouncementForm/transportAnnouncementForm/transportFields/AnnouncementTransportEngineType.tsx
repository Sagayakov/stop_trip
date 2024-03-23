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

export const AnnouncementTransportEngineType = ({
    setValue,
    control,
    defaultValue,
    errors,
}: Props) => {
    const { t } = useTranslation();
    const { data } = useGetSelectOptionsQuery('');
    const lang = useAppSelector((state) => state.setLang.lang);

    useEffect(() => {
        if (defaultValue) {
            setValue(
                'transport_engine_type',
                String(
                    getDefaultValue(defaultValue, data!.transport_engine_type)!
                        .value
                )
            );
        } //если есть значение по умолчанию, устанавливаем его. Если юзер поменяет выбор, то установится новое значение
    }, []);

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.transport_engine_type')}:</h3>
            <UniversalSelectDropdown<FormAddAnn>
                closeMenuOnSelect={true}
                control={control}
                isMulti={false}
                name="transport_engine_type"
                options={
                    lang === 'ru'
                        ? data?.transport_engine_type
                        : data?.transport_engine_type.map((el) => ({
                              value: el.value,
                              label: `${el.value[0].toUpperCase()}${el.value.slice(
                                  1
                              )}`,
                          }))
                }
                placeholder={t('filters.transport_engine_type')}
                defaultValue={
                    getDefaultValue(
                        defaultValue,
                        data?.transport_engine_type
                    ) as StringOptions
                }
                prefix="filterAnnouncementCategory"
                setValue={setValue}
            />
            <div className={styles.ann_field_err}>
                {errors?.transport_engine_type?.message}
            </div>
        </div>
    );
};
