import CookieConsent from 'react-cookie-consent';
import styles from './cookieConsentPopup.module.scss';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import { Close } from 'shared/ui/icons/icons-tools/Close';

export const CookieConsentPopup = () => {
    const { t } = useTranslation();

    const handleCloseCookies = () => {
        Cookies.set('user_consent', 'true');
    };

    return (
        <div className={styles.popup}>
            <CookieConsent
                location="bottom"
                buttonText="OK"
                cookieName="user_consent"
                overlay
                overlayClasses={styles.cookie_bg_shadow}
                contentClasses={styles.accept_cookie_text}
                containerClasses={styles.accept_cookie_wrapper}
                style={{ background: '#2B373B' }}
                buttonClasses={styles.accept_button}
                expires={150}
            >
                <p>{t('cookie-consent')}</p>
                <div
                    className={styles.close_portal}
                    onClick={handleCloseCookies}
                >
                    <Close color="white" />
                </div>
            </CookieConsent>
        </div>
    );
};
