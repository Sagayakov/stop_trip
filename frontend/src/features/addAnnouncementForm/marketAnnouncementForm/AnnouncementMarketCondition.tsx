import { FormState, UseFormRegister } from 'react-hook-form';
import { UniversalRadioGroup } from 'entity/universalEntites/UniversalRadioGroup';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss';
import { useGetSelectOptionsQuery } from 'app/api/fetchAdverts.ts';
import { useAppSelector } from 'app/store/hooks';

interface Props {
    register: UseFormRegister<FormAddAnn>;
    defaultValue: string | undefined;
    formState: FormState<FormAddAnn>;
}

export const AnnouncementMarketCondition = ({
    register,
    defaultValue,
    formState,
}: Props) => {
    const { t } = useTranslation();
    const { data } = useGetSelectOptionsQuery('');
    const lang = useAppSelector((state) => state.setLang.lang);

    const getDefaultValue = () => {
        if (defaultValue) {
            return data?.market_condition.find(
                (el) => el.value === defaultValue
            );
        }
    };

    return (
        <div className={styles.ann_field}>
            <h3>{t('filters.market_condition')}:</h3>
            <UniversalRadioGroup
                register={register}
                name="market_condition"
                radioValues={
                    (lang === 'ru'
                        ? data?.market_condition
                        : data?.market_condition.map((el) => ({
                              value: el.value,
                              label: `${el.value[0].toUpperCase()}${el.value.slice(
                                  1
                              )}`,
                          }))) || [{ value: '', label: '' }]
                }
                defaultValue={getDefaultValue()}
                className={styles.radio_group}
            />
            <div className={styles.ann_field_err}>
                {formState?.errors?.market_condition?.message}
            </div>
        </div>
    );
};
