import { FeedbackForm } from 'features/footer';
import { LogoHeader } from 'shared/ui/icons/icons-tools/LogoHeader.tsx';
import styles from './footer.module.scss';
import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';
import { FooterBottomDesktop } from 'entity/footer/FooterBottomDesktop.tsx';
import { FooterBottomMobile } from 'entity/footer/FooterBottomMobile.tsx';
import { useState } from 'react';

export const Footer = () => {
    const { isMobile } = useMatchMedia();
    const [showCaptcha, setShowCaptcha] = useState(false);
    const opacity = () => {
        return { opacity: `${showCaptcha ? '1' : '0'}` };
    };

    return (
        <footer>
            <div className={styles.footer_wrapper}>
                <div className={styles.footer_top}>
                    {!isMobile && <LogoHeader isFooter={true} />}
                    <FeedbackForm
                        showCaptcha={showCaptcha}
                        setShowCaptcha={setShowCaptcha}
                    />
                </div>
                <div className={styles.hr}>
                    {/*Выводим капчу по клику по форме*/}
                    <div className={styles.reCaptcha_brand} style={opacity()}>
                        {/*для линцензионного соглашения с google*/}
                        This site is protected by reCAPTCHA and the Google
                        {'\u00A0'}
                        <a href="https://policies.google.com/privacy">
                            Privacy Policy
                        </a>{' '}
                        and{'\u00A0'}
                        <a href="https://policies.google.com/terms">
                            Terms of Service
                        </a>{' '}
                        apply.
                    </div>
                    <hr />
                </div>
                {isMobile && <FooterBottomDesktop />}
                {!isMobile && <FooterBottomMobile />}
            </div>
        </footer>
    );
};
