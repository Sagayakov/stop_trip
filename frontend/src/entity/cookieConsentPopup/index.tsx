import CookieConsent from 'react-cookie-consent';
import styles from './cookieConsentPopup.module.scss';

export const CookieConsentPopup = () => {
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
                <p>
                    Для повышения удобства сайта мы используем cookies.
                    Оставаясь на сайте, вы соглашаетесь с политикой их
                    применения.
                </p>
                <p>
                    To improve the convenience of the site, we use cookies. By
                    remaining on the site, you agree to the policy of their use.
                </p>
            </CookieConsent>
        </div>
    );
};
