import { UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from 'entities/universalEntites/UniversalRadioGroup';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { valuesOfTransportForm } from 'widgets/settingForm/settingTransport/libr/valuesOfTransportForm.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss'

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnoucementTransportCondition = ({ register }: Props) => {
    const conditionValue = valuesOfTransportForm.transport_condition;
    const { t } = useTranslation();

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.transport_condition')}</h3>
            <UniversalRadioGroup
                register={register}
                name="transport_condition"
                radioValues={conditionValue}
                className={styles.radio_group}
            />
            <div className={styles.ann_field_err}></div>
        </div>
    );
};
