import { UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from 'entities/universalEntites/UniversalRadioGroup';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss'

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: string | null;
}

export const AnnouncementTaxiUnit = ({ register, defaultValue }: Props) => {
    const { t } = useTranslation();

    const valuesOfTaxiUnit = [
        { label: 'Маршрут', value: 'route' },
        { label: 'Час', value: 'hour' },
        { label: 'Км', value: 'km' },
    ];
    const getDefaultValue = () => {
        if(defaultValue){
            return valuesOfTaxiUnit.find((el) => el.value === defaultValue)
        }
    }

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.taxi_unit')}:</h3>
            <UniversalRadioGroup
                register={register}
                name="taxi_unit"
                radioValues={valuesOfTaxiUnit}
                className={styles.radio_group}
                defaultValue={getDefaultValue()}
            />
            <div className={styles.ann_field_err}></div>
        </div>
    );
};
