import { FeedbackForm } from 'features/footer';
import { LogoHeader } from 'shared/ui/icons/icons-tools/LogoHeader.tsx';
import styles from './footer.module.scss';
import { FooterBottomMobile } from 'entity/footer/FooterBottomMobile.tsx';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Подвал — одна компактная строка: логотип, контакты, соглашение и кнопка
 * «Предложить улучшение», которая раскрывает форму пожеланий.
 */
export const Footer = () => {
    const { t } = useTranslation();
    const [showCaptcha, setShowCaptcha] = useState(false);
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
    const panelRef = useRef<HTMLDivElement>(null);

    // Форма раскрывается внизу страницы, за краем экрана — прокручиваем к ней и ставим курсор
    useEffect(() => {
        if (isFeedbackOpen && panelRef.current) {
            panelRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
            panelRef.current.querySelector('textarea')?.focus({ preventScroll: true });
        }
    }, [isFeedbackOpen]);

    return (
        <footer>
            <div className={styles.footer_wrapper}>
                <div className={styles.footer_row}>
                    <LogoHeader isFooter={true} />
                    <FooterBottomMobile />
                    <button
                        type="button"
                        className={styles.feedback_toggle}
                        onClick={() => setIsFeedbackOpen(!isFeedbackOpen)}
                        aria-expanded={isFeedbackOpen}
                    >
                        {t('footer.suggest')}
                    </button>
                </div>
                {isFeedbackOpen && (
                    <div className={styles.feedback_panel} ref={panelRef}>
                        <FeedbackForm
                            showCaptcha={showCaptcha}
                            setShowCaptcha={setShowCaptcha}
                        />
                        {/*для лицензионного соглашения с google — показываем, когда видна форма*/}
                        <div
                            className={styles.reCaptcha_brand}
                            style={{ opacity: showCaptcha ? 1 : 0 }}
                        >
                            This site is protected by reCAPTCHA and the Google{' '}
                            <a href="https://policies.google.com/privacy">Privacy Policy</a>{' '}
                            and{' '}
                            <a href="https://policies.google.com/terms">Terms of Service</a>{' '}
                            apply.
                        </div>
                    </div>
                )}
            </div>
        </footer>
    );
};
