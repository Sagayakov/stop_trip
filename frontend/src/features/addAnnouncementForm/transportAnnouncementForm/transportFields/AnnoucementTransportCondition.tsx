import { UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from 'entity/universalEntites/UniversalRadioGroup';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { useGetSelectOptionsQuery } from 'app/api/fetchAdverts.ts';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: string | null | undefined;
}

export const AnnoucementTransportCondition = ({
    register,
    defaultValue,
}: Props) => {
    const { data } = useGetSelectOptionsQuery('');
    const { t } = useTranslation();

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.transport_condition')}:</h3>
            <UniversalRadioGroup
                register={register}
                name="transport_condition"
                radioValues={data!.transport_condition}
                defaultValue={data?.transport_condition.find(
                    (el) => el.value === defaultValue
                )}
                className={styles.radio_group}
            />
            <div className={styles.ann_field_err}></div>
        </div>
    );
};
