import { FeedbackForm } from 'features/footer';
import { LogoHeader } from 'shared/ui/icons/icons-tools/LogoHeader.tsx';
import styles from './footer.module.scss';
import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';
import { FooterBottomDesctop, FooterBottomMobile } from 'entities/footer';

export const Footer = () => {
    const { isMobile } = useMatchMedia();

    return (
        <footer>
            <div className={styles.footer_wrapper}>
                <div className={styles.footer_top}>
                    {!isMobile && <LogoHeader isFooter={true} />}
                    <FeedbackForm />
                </div>
                <div className={styles.hr}>
                    <hr />
                </div>
                {isMobile && <FooterBottomDesctop />}
                {!isMobile && <FooterBottomMobile />}
            </div>
        </footer>
    );
};
