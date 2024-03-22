import { FormState, UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from 'entity/universalEntites/UniversalRadioGroup';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { useGetSelectOptionsQuery } from 'app/api/fetchAdverts.ts';
import { useAppSelector } from 'app/store/hooks';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue?: string | null;
    formState: FormState<FormAddAnn>;
}

export const AnnouncementTaxiUnit = ({
    register,
    defaultValue,
    formState,
}: Props) => {
    const { t } = useTranslation();
    const { data } = useGetSelectOptionsQuery('');
    const lang = useAppSelector((state) => state.setLang.lang);

    const getDefaultValue = () => {
        if (defaultValue) {
            return data?.taxi_unit.find((el) => el.value === defaultValue);
        }
    };

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.taxi_unit')}:</h3>
            {data && (
                <UniversalRadioGroup
                    register={register}
                    name="taxi_unit"
                    radioValues={
                        lang === 'ru'
                            ? data.taxi_unit
                            : data.taxi_unit.map((el) => ({
                                  value: el.value,
                                  label: el.value,
                              }))
                    }
                    className={styles.radio_group}
                    defaultValue={getDefaultValue()}
                />
            )}
            <div className={styles.ann_field_err}>
                {formState?.errors?.taxi_unit?.message}
            </div>
        </div>
    );
};
