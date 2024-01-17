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

export const AnnouncementTransportTransmission = ({
    register,
    defaultValue,
}: Props) => {
    const transmissionValues =
        valuesOfTransportForm.transport_transmission_type;
    const { t } = useTranslation();

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.transport_transmission_type')}</h3>
            <UniversalRadioGroup
                register={register}
                name="transport_transmission_type"
                defaultValue={transmissionValues.find(
                    (el) => el.value === defaultValue
                )}
                radioValues={transmissionValues}
                className={styles.radio_group}
            />
            <div className={styles.ann_field_err}></div>
        </div>
    );
};
