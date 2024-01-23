import { UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { UniversalRadioGroup } from 'entity/universalEntites/UniversalRadioGroup';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: string | null | undefined;
}

export const AnnouncementRealtyBathroomType = ({
    register,
    defaultValue,
}: Props) => {
    const { t } = useTranslation();

    const optionValues = [
        { label: `${t('filters.combined')}`, value: 'combined' },
        { label: `${t('filters.separate')}`, value: 'separate' },
    ];
    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.property_bathroom_type')}:</h3>
            <div className={styles.radio_group}>
                <UniversalRadioGroup
                    name="property_bathroom_type"
                    radioValues={optionValues}
                    register={register}
                    defaultValue={optionValues.find(
                        (el) => el.value === defaultValue
                    )}
                    className={styles.radio_group}
                />
            </div>
            <div className={styles.ann_field_err}></div>
        </div>
    );
};
