import { FormState, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { FormAddAnn } from 'pages/addAnnouncement/libr/AnnouncementFormTypes.ts';
import { useTranslation } from 'react-i18next';
import styles from 'pages/addAnnouncement/libr/addAnnouncement.module.scss'

interface Props {
    register: UseFormRegister<FormAddAnn>;
    formState: FormState<FormAddAnn>;
    watch: UseFormWatch<FormAddAnn>;
    defaultValue?: number | null;
}

const AnnouncementPriceField = ({ register, formState, defaultValue, watch }: Props) => {
    const { errors } = formState;
    const { t } = useTranslation();
    const category = watch('category');
    const isRequired = !(category === 'exchange_rate');
    const getDefaultPrice = () => {
        if(defaultValue){
            return defaultValue.toString().slice(0, -3)
        }
    }

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
                defaultValue={getDefaultPrice()}
                style={
                    errors?.price
                        ? { border: '1px solid red' }
                        : {}
                }
                {...register('price', { required: isRequired })}
            />
            <div className={styles.ann_field_err}>
                {errors?.price && `${t('add-page.set-price')}`}
            </div>
        </div>
    );
};

export default AnnouncementPriceField;
