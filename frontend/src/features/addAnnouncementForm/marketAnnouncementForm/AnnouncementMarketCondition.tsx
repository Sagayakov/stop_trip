import { UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from 'entities/universalEntites/UniversalRadioGroup';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss'

interface Props {
    register: UseFormRegister<FormAddAnn>;
}

export const AnnouncementMarketCondition = ({ register }: Props) => {
    const { t } = useTranslation();
    const conditionValues = [
        { label: `${t('filters.used')}`, value: 'used' },
        { label: `${t('filters.new')}`, value: 'new' },
    ];

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.market_condition')}:</h3>
            <UniversalRadioGroup
                register={register}
                name="market_condition"
                radioValues={conditionValues}
                className={styles.radio_group}
            />
            <div className={styles.ann_field_err}></div>
        </div>
    );
};
