import { Control, FormState, UseFormSetValue } from 'react-hook-form';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { getDefaultValue } from 'features/addAnnouncementForm/getDefaultValue.ts';
import { useGetSelectOptionsQuery } from 'app/api/fetchAdverts.ts';
import { StringOptions } from 'app/api/types/selectOptionValues.ts';
import { useEffect } from 'react';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    defaultValue?: string | null | undefined;
    formState: FormState<FormAddAnn>;
}

export const AnnouncementTransportMark = ({
    setValue,
    control,
    defaultValue,
    formState,
}: Props) => {
    const { t } = useTranslation();
    const { data } = useGetSelectOptionsQuery('');

    useEffect(() => {
        if (defaultValue) {
            setValue(
                'transport_brand',
                String(
                    getDefaultValue(defaultValue, data?.transport_brand)!.value
                )
            );
        } //если есть значение по умолчанию, устанавливаем его. Если юзер поменяет выбор, то установится новое значение
    }, [defaultValue]);

    return (
        <div className={styles.ann_field}>
            <h3>
                {t('filters.transport_brand')}
                <span>*</span>:
            </h3>
            <UniversalSelectDropdown<FormAddAnn>
                closeMenuOnSelect={true}
                control={control}
                isMulti={false}
                name="transport_brand"
                options={data?.transport_brand}
                placeholder={t('filters.choose-brand')}
                defaultValue={
                    getDefaultValue(
                        defaultValue,
                        data?.transport_brand
                    ) as StringOptions
                }
                prefix="filterAnnouncementCategory"
                setValue={setValue}
                requiredFiled={true}
            />
            <div className={styles.ann_field_err}>
                {formState?.errors?.transport_brand?.message}
            </div>
        </div>
    );
};
