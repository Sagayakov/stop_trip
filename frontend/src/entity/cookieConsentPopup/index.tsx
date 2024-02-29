import CookieConsent from 'react-cookie-consent';
import styles from './cookieConsentPopup.module.scss';
import { useTranslation } from 'react-i18next';

export const CookieConsentPopup = () => {
    const { t } = useTranslation();

    return (
        <div className="popup">
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
            </CookieConsent>
        </div>
    );
};
