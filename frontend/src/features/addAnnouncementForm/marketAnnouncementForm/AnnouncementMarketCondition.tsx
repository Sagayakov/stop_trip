import { FormState, UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from 'entity/universalEntites/UniversalRadioGroup';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { useGetSelectOptionsQuery } from 'app/api/fetchAdverts.ts';


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
    const { data } = useGetSelectOptionsQuery('');

    const getDefaultValue = () => {
        if (defaultValue) {
            return data?.market_condition.find((el) => el.value === defaultValue);
        }
    };

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.market_condition')}<span>*</span>:</h3>
            <UniversalRadioGroup
                register={register}
                name="market_condition"
                radioValues={data?.market_condition || [{ value: '', label: '' }]}
                defaultValue={getDefaultValue()}
                className={styles.radio_group}
                requiredField={true}
            />
            <div className={styles.ann_field_err}>{formState?.errors?.market_condition?.message}</div>
        </div>
    );
};
