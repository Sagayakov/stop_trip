import { Control, FormState, UseFormSetValue } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import { getDefaultValue } from 'features/addAnnouncementForm/getDefaultValue.ts';
import { useEffect } from 'react';
import { useGetSelectOptionsQuery } from 'app/api/fetchAdverts.ts';
import { StringOptions } from 'app/api/types/selectOptionValues.ts';
import { useAppSelector } from 'app/store/hooks';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    defaultValue?: string | null | undefined;
    formState: FormState<FormAddAnn>;
}

export const AnnouncementDocType = ({
    setValue,
    control,
    defaultValue,
    formState,
}: Props) => {
    const { t } = useTranslation();
    const { data } = useGetSelectOptionsQuery('');
    const lang = useAppSelector((state) => state.setLang.lang);

    useEffect(() => {
        if (defaultValue) {
            setValue(
                'document_type',
                String(
                    getDefaultValue(defaultValue, data?.document_type)!.value
                )
            );
        } //если есть значение по умолчанию, устанавливаем его. Если юзер поменяет выбор, то установится новое значение
    }, []);

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.document_type')}:</h3>
            <UniversalSelectDropdown
                setValue={setValue}
                control={control}
                name="document_type"
                prefix="filterAnnouncementCategory"
                placeholder={t('filters.document_type')}
                closeMenuOnSelect={true}
                isMulti={false}
                options={
                    lang === 'ru'
                        ? data?.document_type
                        : data?.document_type.map((el) => ({
                              value: el.value,
                              label: `${el.value[0].toUpperCase()}${el.value.slice(
                                  1
                              )}`,
                          }))
                }
                defaultValue={
                    getDefaultValue(
                        defaultValue,
                        data?.document_type
                    ) as StringOptions
                }
            />
            <div className={styles.ann_field_err}>
                {formState?.errors?.document_type?.message}
            </div>
        </div>
    );
};
