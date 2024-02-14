import styles from 'features/complainAboutAnnounsement/libr/modalComplain.module.scss';
import { UseFormRegister } from 'react-hook-form';
import { ComplainTypes } from 'features/complainAboutAnnounsement/libr/ComplainTypes.ts';
import { useTranslation } from 'react-i18next';

interface Props {
    register: UseFormRegister<ComplainTypes>;
}

export const ComplainStepOne = ({ register }: Props) => {
    const { t } = useTranslation();
    return (
        <>
            <div className={styles.select_reason}>
                <label className="form_checkbox">
                    <input type="radio" {...register('reason')} value="offer_not_current" />
                    <span>{t('complain-reason.not-current')}</span>
                </label>
                <label className="form_checkbox">
                    <input type="radio" {...register('reason')} value="not_censored" />
                    <span>{t('complain-reason.not-censored')}</span>
                </label>
                <label className="form_checkbox">
                    <input type="radio" {...register('reason')} value="prohibited_substances" />
                    <span>{t('complain-reason.prohibited-substances')}</span>
                </label>
                <label className="form_checkbox">
                    <input type="radio" {...register('reason')} value="scammer" />
                    <span>{t('complain-reason.scammer')}</span>
                </label>
                <label className="form_checkbox">
                    <input type="radio" {...register('reason')} value="wrong_description" />
                    <span>{t('complain-reason.wrong-description')}</span>
                </label>
                <label className="form_checkbox">
                    <input type="radio" {...register('reason')} value="wrong_location" />
                    <span>{t('complain-reason.wrong-location')}</span>
                </label>
                <label className="form_checkbox">
                    <input type="radio" {...register('reason')} value="wrong_price" />
                    <span>{t('complain-reason.wrong-price')}</span>
                </label>
                <label className="form_checkbox">
                    <input type="radio" {...register('reason')} value="other" />
                    <span>{t('complain-reason.other')}</span>
                </label>
            </div>
        </>
    )
}