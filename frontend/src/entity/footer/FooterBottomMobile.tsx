import { Telegram } from 'shared/ui/icons/contacts/Telegram.tsx';
import { WhatsApp } from 'shared/ui/icons/contacts/WhatsApp.tsx';
import styles from 'widgets/footer/footer.module.scss';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const FooterBottomMobile = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.footer_bot}>
            <div className={styles.contacts}>
                <Link to="https://t.me/StopTripAdmin" target="_blank">
                    <Telegram color="#3968aa" />
                </Link>
                <Link
                    to="https://api.whatsapp.com/send/?phone=%2B77053699731&text&type=phone_number&app_absent=0"
                    target="_blank"
                >
                    <WhatsApp color="#10bf3e" />
                </Link>
            </div>
            <div className={styles.email_agreement}>
                <a
                    href="mailto:admin@stoptrip.com"
                    target="_blank"
                    className={styles.email_link}
                >
                    admin@stoptrip.com
                </a>
                <Link
                    to="/user-agreement"
                    target="_blank"
                    className={styles.user_agreement}
                >
                    {t('user_agreement.link')}
                </Link>
            </div>
        </div>
    );
};
