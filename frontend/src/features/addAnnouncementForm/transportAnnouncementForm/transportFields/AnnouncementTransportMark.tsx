import { Control, UseFormSetValue } from 'react-hook-form';
import { UniversalSelectDropdown } from 'entities/universalEntites/UniversalSelectDropdown';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { valuesOfTransportForm } from 'widgets/settingForm/settingTransport/libr/valuesOfTransportForm.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss'
import { getDefaultValue } from 'features/addAnnouncementForm/getDefaultValue.ts';

interface Props {
    setValue: UseFormSetValue<FormAddAnn>;
    control: Control<FormAddAnn, string[]>;
    defaultValue?: string | null | undefined;
}

export const AnnouncementTransportMark = ({ setValue, control, defaultValue }: Props) => {
    const { t } = useTranslation();

    const optionValues = valuesOfTransportForm.transport_brand;

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.transport_brand')}</h3>
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
            />
            <div className={styles.ann_field_err}></div>
        </div>
    );
};
