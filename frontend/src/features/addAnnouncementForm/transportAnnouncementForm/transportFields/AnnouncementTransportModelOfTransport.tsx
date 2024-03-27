import {
    Control,
    FormState,
    UseFormSetValue,
    UseFormWatch,
} from 'react-hook-form';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { getDefaultValue } from 'features/addAnnouncementForm/getDefaultValue.ts';
import {
    useGetModelsByBrandQuery,
    useGetSelectOptionsQuery,
} from 'app/api/fetchAdverts.ts';
import { StringOptions } from 'app/api/types/selectOptionValues.ts';
import { useEffect, useState } from 'react';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    defaultValue?: string | null | undefined;
    formState: FormState<FormAddAnn>;
    watch: UseFormWatch<FormAddAnn>;
}

export const AnnouncementTransportModelOfTransport = ({
    setValue,
    control,
    defaultValue,
    formState,
    watch,
}: Props) => {
    const { t } = useTranslation();
    const { data } = useGetSelectOptionsQuery('');
    const brand = watch('transport_brand');
    const category = watch('transport_category');
    const [options, setOptions] = useState<StringOptions[]>([]);
    const { data: availableData } = useGetModelsByBrandQuery(
        `?brand=${brand}${category ? `&category=${category}` : ''}`
    );
    const disabled = brand && brand.length ? false : true;

    useEffect(() => {
        if (availableData) {
            setOptions(
                availableData.map((el) => ({ value: el.slug, label: el.name }))
            );
        }
        if (defaultValue) {
            setValue(
                'transport_model',
                String(
                    getDefaultValue(defaultValue, data?.transport_model)!.value
                )
            );
        } //если есть значение по умолчанию, устанавливаем его. Если юзер поменяет выбор, то установится новое значение
    }, [defaultValue, availableData, data?.transport_model]);

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.transport_model')}:</h3>
            <UniversalSelectDropdown<FormAddAnn>
                closeMenuOnSelect={true}
                control={control}
                isMulti={false}
                name="transport_model"
                options={options}
                placeholder={t('filters.choose-model')}
                defaultValue={
                    getDefaultValue(
                        defaultValue,
                        data?.transport_model
                    ) as StringOptions
                }
                prefix="filterAnnouncementCategory"
                setValue={setValue}
                isDisabled={disabled}
            />
            <div className={styles.ann_field_err}>
                {formState?.errors?.transport_model?.message}
            </div>
        </div>
    );
};
