import { FormState, UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from 'entity/universalEntites/UniversalRadioGroup';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: string | null;
    formState: FormState<FormAddAnn>;
}

export const AnnouncementTaxiUnit = ({ register, defaultValue, formState}: Props) => {
    const { t } = useTranslation();

    const valuesOfTaxiUnit = [
        { label: 'Маршрут', value: 'route' },
        { label: 'Час', value: 'hour' },
        { label: 'Км', value: 'km' },
    ];
    const getDefaultValue = () => {
        if (defaultValue) {
            return valuesOfTaxiUnit.find((el) => el.value === defaultValue);
        }
    };

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.taxi_unit')}<span>*</span>:</h3>
            <UniversalRadioGroup
                register={register}
                name="taxi_unit"
                radioValues={valuesOfTaxiUnit}
                className={styles.radio_group}
                defaultValue={getDefaultValue()}
                requiredField={true}
            />
            <div className={styles.ann_field_err}>{formState?.errors?.taxi_unit?.message}</div>
        </div>
    );
};
