import { FormState, UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from 'entity/universalEntites/UniversalRadioGroup';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue: string | undefined;
    formState: FormState<FormAddAnn>;
}

export const AnnouncementMarketCondition = ({
    register,
    defaultValue,
    formState
}: Props) => {
    const { t } = useTranslation();
    const conditionValues = [
        { label: `${t('filters.used')}`, value: 'used' },
        { label: `${t('filters.new')}`, value: 'new' },
    ];

    const getDefaultValue = () => {
        if (defaultValue) {
            return conditionValues.find((el) => el.value === defaultValue);
        }
    };

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.market_condition')}<span>*</span>:</h3>
            <UniversalRadioGroup
                register={register}
                name="market_condition"
                radioValues={conditionValues}
                defaultValue={getDefaultValue()}
                className={styles.radio_group}
                requiredField={true}
            />
            <div className={styles.ann_field_err}>{formState?.errors?.market_condition?.message}</div>
        </div>
    );
};
