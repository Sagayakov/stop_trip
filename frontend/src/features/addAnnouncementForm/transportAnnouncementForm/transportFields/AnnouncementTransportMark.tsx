import { Control, FormState, UseFormSetValue } from 'react-hook-form';
import { UniversalSelectDropdown } from 'entity/universalEntites/UniversalSelectDropdown';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { getDefaultValue } from 'features/addAnnouncementForm/getDefaultValue.ts';

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
    formState
}: Props) => {
    const { t } = useTranslation();
    const optionValues = [
        {value: 'bmw', label: 'BMW'},
        {value: 'toyota', label: 'Toyota'},
        {value: 'yamaha', label: 'Yamaha'},
    ];

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.transport_brand')}<span>*</span>:</h3>
            <UniversalSelectDropdown<FormAddAnn>
                closeMenuOnSelect={true}
                control={control}
                isMulti={false}
                name="transport_brand"
                options={optionValues}
                placeholder={t('filters.choose-brand')}
                defaultValue={getDefaultValue(defaultValue, optionValues)}
                prefix="filterAnnouncementCategory"
                setValue={setValue}
                requiredFiled={true}
            />
            <div className={styles.ann_field_err}>{formState?.errors?.transport_brand?.message}</div>
        </div>
    );
};
