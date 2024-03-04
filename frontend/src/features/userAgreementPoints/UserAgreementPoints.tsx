import { useTranslation } from 'react-i18next';
import styles from './libr/userAgreementPoints.module.scss';

export const UserAgreementPoints = () => {
    const { t } = useTranslation();

    return (
        <section className={styles.points_wrapper}>
            <ol className={styles.points_list}>
                <li id="general">
                    {t('user_agreement.1_header')}
                    <ol className={styles.sub_points_list}>
                        <li>{t('user_agreement.1_1_text')}</li>
                        <li>{t('user_agreement.1_2_text')}</li>
                        <li>{t('user_agreement.1_3_text')}</li>
                    </ol>
                </li>
                <li id="subject">
                    {t('user_agreement.2_header')}
                    <ol className={styles.sub_points_list}>
                        <li>{t('user_agreement.2_1_text')}</li>
                    </ol>
                </li>
                <li id="responsibility">
                    {t('user_agreement.3_header')}
                    <ol className={styles.sub_points_list}>
                        <li>{t('user_agreement.3_1_text')}</li>
                        <li>{t('user_agreement.3_2_text')}</li>
                    </ol>
                </li>
                <li id="rights">
                    {t('user_agreement.4_header')}
                    <ol className={styles.sub_points_list}>
                        <li>{t('user_agreement.4_1_text')}</li>
                        <li>{t('user_agreement.4_2_text')}</li>
                        <li>{t('user_agreement.4_3_text')}</li>
                    </ol>
                </li>
                <li id="dispute">
                    {t('user_agreement.5_header')}
                    <ol className={styles.sub_points_list}>
                        <li>{t('user_agreement.5_1_text')}</li>
                        <li>{t('user_agreement.5_2_text')}</li>
                    </ol>
                </li>
                <li id="changes">
                    {t('user_agreement.6_header')}
                    <ol className={styles.sub_points_list}>
                        <li>{t('user_agreement.6_1_text')}</li>
                        <li>{t('user_agreement.6_2_text')}</li>
                    </ol>
                </li>
                <li id="final">
                    {t('user_agreement.7_header')}
                    <ol className={styles.sub_points_list}>
                        <li>{t('user_agreement.7_1_text')}</li>
                        <li>{t('user_agreement.7_2_text')}</li>
                        <li>{t('user_agreement.7_3_text')}</li>
                        <li>{t('user_agreement.7_4_text')}</li>
                        <li>{t('user_agreement.7_5_text')}</li>
                    </ol>
                </li>
                <li id="processing">
                    {t('user_agreement.8_header')}
                    <ol className={styles.sub_points_list}>
                        <li>{t('user_agreement.8_1_text')}</li>
                        <li>{t('user_agreement.8_2_text')}</li>
                        <li>{t('user_agreement.8_3_text')}</li>
                        <li>{t('user_agreement.8_4_text')}</li>
                        <li>{t('user_agreement.8_5_text')}</li>
                        <li>{t('user_agreement.8_6_text')}</li>
                        <li>{t('user_agreement.8_7_text')}</li>
                        <li>{t('user_agreement.8_8_text')}</li>
                        <li>{t('user_agreement.8_9_text')}</li>
                        <li>{t('user_agreement.8_10_text')}</li>
                        <li>{t('user_agreement.8_11_text')}</li>
                    </ol>
                </li>
            </ol>
            <p>{t('user_agreement.final_text')}</p>
        </section>
    );
};
