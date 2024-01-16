import { FeedbackForm } from 'features/footer';
import { LogoHeader } from 'shared/ui/icons/icons-tools/LogoHeader.tsx';
import styles from './footer.module.scss';
import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';
import { FooterBottomDesktop } from 'entity/footer/FooterBottomDesktop.tsx';
import { FooterBottomMobile } from 'entity/footer/FooterBottomMobile.tsx';

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
                {isMobile && <FooterBottomDesktop />}
                {!isMobile && <FooterBottomMobile />}
            </div>
        </footer>
    );
};
