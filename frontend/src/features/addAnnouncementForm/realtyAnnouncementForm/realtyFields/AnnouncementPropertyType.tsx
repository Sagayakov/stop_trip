import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { getDefaultValue } from 'features/addAnnouncementForm/getDefaultValue.ts';
import { Control, FormState, UseFormSetValue } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import { useGetSelectOptionsQuery } from 'app/api/fetchAdverts.ts';
import { StringOptions } from 'app/api/types/selectOptionValues.ts';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    defaultValue?: string | null | undefined;
    formState: FormState<FormAddAnn>;
}

export const AnnouncementPropertyType = ({
    setValue,
    control,
    defaultValue,
    formState,
}: Props) => {
    const { t } = useTranslation();
    const { data } = useGetSelectOptionsQuery('');

    useEffect(() => {
        if (data && defaultValue) {
            setValue(
                'property_type',
                String(
                    getDefaultValue(defaultValue, data?.property_type)?.value
                )
            );
        } //если есть значение по умолчанию, устанавливаем его. Если юзер поменяет выбор, то установится новое значение
    }, [defaultValue, data]);

    return (
        <div className={styles.ann_field}>
            <h3>
                {t('filters.property-type')}
                <span>*</span>:
            </h3>
            <UniversalSelectDropdown<FormAddAnn>
                closeMenuOnSelect={true}
                control={control}
                isMulti={false}
                name="property_type"
                options={data?.property_type}
                placeholder={t('filters.property-type')}
                defaultValue={
                    getDefaultValue(
                        defaultValue,
                        data?.property_type
                    ) as StringOptions
                }
                prefix="filterAnnouncementCategory"
                setValue={setValue}
                requiredFiled={true}
            />
            <div className={styles.ann_field_err}>
                {formState?.errors?.property_type?.message}
            </div>
        </div>
    );
};
