import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { useTranslation } from 'react-i18next';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown.tsx';
import { Control, FormState, UseFormSetValue } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useGetSelectOptionsQuery } from 'app/api/fetchAdverts';
import { useEffect, useState } from 'react';
import { NameType } from 'pages/advertPage/libr/types';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    defaultValue?: NameType | null;
    formState: FormState<FormAddAnn>;
}

type SelectType = {
    value: string;
    label: string;
};

const AnnouncementRegion = ({
    control,
    setValue,
    formState,
    defaultValue,
}: Props) => {
    const { t } = useTranslation();
    const [options, setOptions] = useState<SelectType[]>([]);
    const { data } = useGetSelectOptionsQuery('');

    useEffect(() => {
        if (data) {
            const result = (data['region'] as SelectType[]).filter(
                (el) => (el as SelectType).value && (el as SelectType).label
            );
            setOptions(result as SelectType[]);
        }
        if (defaultValue) {
            const defaultRegion = data?.region.find(
                (el) => el.label === defaultValue.name
            );
            setValue('region', defaultRegion?.value);
        }
    }, [data, defaultValue, setValue]);

    return (
        <div className={styles.ann_field}>
            <h3>
                {t('add-page.region')}
                <span>*</span>:
            </h3>
            <UniversalSelectDropdown<FormAddAnn>
                setValue={setValue}
                control={control}
                name="region"
                prefix="filterAnnouncementCategory"
                placeholder={t('add-page.region')}
                closeMenuOnSelect={true}
                isMulti={false}
                isDisabled={false}
                options={options}
                defaultValue={{
                    value: defaultValue?.slug || 'north-goa',
                    label: defaultValue?.name || 'Северный Гоа',
                }}
                //requiredFiled={true}
            />
            <div className={styles.ann_field_err}>
                {formState?.errors?.region?.message}
            </div>
        </div>
    );
};
export default AnnouncementRegion;
