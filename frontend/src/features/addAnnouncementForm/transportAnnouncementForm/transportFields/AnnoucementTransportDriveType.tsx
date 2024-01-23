import { UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from 'entity/universalEntites/UniversalRadioGroup';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { valuesOfTransportForm } from 'widgets/settingForm/settingTransport/libr/valuesOfTransportForm.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: string | null | undefined;
}

export const AnnoucementTransportDriveType = ({
    register,
    defaultValue,
}: Props) => {
    const { t } = useTranslation();

    const driveValue = valuesOfTransportForm.transport_drive_type;

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.transport_drive_type')}:</h3>
            <UniversalRadioGroup
                register={register}
                name="transport_drive_type"
                radioValues={driveValue}
                defaultValue={driveValue.find(
                    (el) => el.value === defaultValue
                )}
                className={styles.radio_group}
            />
            <div className={styles.ann_field_err}></div>
        </div>
    );
};
