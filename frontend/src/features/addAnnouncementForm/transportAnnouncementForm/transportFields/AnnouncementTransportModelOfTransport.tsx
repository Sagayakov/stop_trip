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
    const [options, setOptions] = useState<StringOptions[]>([]);
    const { data: availableData } = useGetModelsByBrandQuery(`?brand=${brand}`);

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
            <h3>
                {t('filters.transport_model')}
                <span>*</span>:
            </h3>
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
                requiredFiled={true}
            />
            <div className={styles.ann_field_err}>
                {formState?.errors?.transport_model?.message}
            </div>
        </div>
    );
};
