import { FormState, UseFormRegister } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss'

interface Props {
    register: UseFormRegister<FormAddAnn>;
    formState: FormState<FormAddAnn>;
}

const AnnouncementPriceField = ({ register, formState }: Props) => {
    const { errors } = formState;
    const { t } = useTranslation();

    return (
        <div className={styles.ann_field}>
            <h3>
                {t('add-page.price')}
                <span>*</span>:
            </h3>
            <input
                type="text"
                id={styles.ann_field_price}
                placeholder={t('add-page.price')}
                style={
                    errors?.price
                        ? {
                              border: '1px solid red',
                          }
                        : {}
                }
                {...register('price', { required: true })}
            />
            <div className={styles.ann_field_err}>
                {errors?.price && `${t('add-page.set-price')}`}
            </div>
        </div>
    );
};

export default AnnouncementPriceField;
