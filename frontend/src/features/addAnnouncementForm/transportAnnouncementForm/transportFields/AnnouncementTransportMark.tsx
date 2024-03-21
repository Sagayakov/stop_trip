import { Control, FormState, UseFormSetValue } from 'react-hook-form';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { getDefaultBrand } from 'features/addAnnouncementForm/getDefaultValue.ts';
import { useGetAllBrandsQuery } from 'app/api/fetchAdverts.ts';
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
    const { data } = useGetAllBrandsQuery('');

    useEffect(() => {
        if (defaultValue && data) {
            setValue(
                'transport_brand',
                String(getDefaultBrand(defaultValue, data)?.value)
            );
        } //если есть значение по умолчанию, устанавливаем его. Если юзер поменяет выбор, то установится новое значение
    }, [defaultValue, data]);

    return (
        <div className={styles.ann_field}>
            <h3>
                {t('filters.transport_brand')}:
            </h3>
            {data && (
                <UniversalSelectDropdown<FormAddAnn>
                    closeMenuOnSelect={true}
                    control={control}
                    isMulti={false}
                    name="transport_brand"
                    options={data.map((el) => ({
                        value: el.slug,
                        label: el.name,
                    }))}
                    placeholder={t('filters.choose-brand')}
                    defaultValue={
                        getDefaultBrand(defaultValue, data) as StringOptions
                    }
                    prefix="filterAnnouncementCategory"
                    setValue={setValue}
                />
            )}
            <div className={styles.ann_field_err}>
                {formState?.errors?.transport_brand?.message}
            </div>
        </div>
    );
};
