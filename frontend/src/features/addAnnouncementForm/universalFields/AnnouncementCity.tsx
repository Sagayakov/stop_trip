import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import {
    FormAddAnn,
    SelectOption,
} from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import {
    Control,
    FormState,
    UseFormSetValue,
    UseFormWatch,
} from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useGetCitiesByRegionQuery } from 'app/api/fetchAdverts.ts';
import { StringOptions } from 'app/api/types/selectOptionValues';
import { NameType } from 'pages/advertPage/libr/types';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    defaultValue?: NameType | null | undefined;
    formState: FormState<FormAddAnn>;
    watch: UseFormWatch<FormAddAnn>;
}

const AnnouncementCity = ({
    control,
    setValue,
    defaultValue,
    formState,
    watch,
}: Props) => {
    const { t } = useTranslation();
    const region = watch('region');
    const { data: availableData } = useGetCitiesByRegionQuery(
        `?region=${region || 'north-goa'}`
    );
    const [options, setOptions] = useState<StringOptions[]>([]);
    const [defaultCity, setDefaultCity] = useState<SelectOption>({
        value: '',
        label: '',
    });

    useEffect(() => {
        if (availableData) {
            setOptions(
                availableData.map((el) => ({ value: el.slug, label: el.name }))
            );
            if (defaultValue) {
                const defCity = availableData.find(
                    (el) => el.slug === defaultValue.slug
                );
                setValue('city', defCity?.slug);
                setDefaultCity({
                    value: defCity?.slug || '',
                    label: defCity?.name || '',
                });
            }
        }
    }, [defaultValue, availableData]);

    return (
        <div className={styles.ann_field}>
            <h3>
                {t('add-page.city')}
                <span>*</span>:
            </h3>
            <UniversalSelectDropdown<FormAddAnn>
                setValue={setValue}
                control={control}
                name="city"
                prefix="filterAnnouncementCategory"
                placeholder={t('add-page.city')}
                closeMenuOnSelect={true}
                isMulti={false}
                options={options}
                requiredFiled={true}
                defaultValue={defaultCity}
            />
            <div className={styles.ann_field_err}>
                {formState?.errors?.city?.message}
            </div>
        </div>
    );
};
export default AnnouncementCity;
