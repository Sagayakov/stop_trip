import { LogoHeader } from 'shared/ui/icons/icons-tools/LogoHeader.tsx';
import { Telegram } from 'shared/ui/icons/contacts/Telegram.tsx';
import { WhatsApp } from 'shared/ui/icons/contacts/WhatsApp.tsx';
import { Facebook } from 'shared/ui/icons/contacts/Facebook.tsx';
import styles from 'widgets/footer/footer.module.scss';
import { Link } from 'react-router-dom';

export const FooterBottomDesktop = () => {
    return (
        <div className={styles.footer_bot}>
            <LogoHeader isFooter={true} />
            <div className={styles.contacts}>
                <a
                    href="mailto:admin@gmail.com"
                    target="_blank"
                    className={styles.email_link}
                >
                    admin@gmail.com
                </a>
                <div className={styles.contacts_logo}>
                    <Link to="https://t.me/StopTripAdmin" target="_blank">
                        <Telegram color="#3968aa" />
                    </Link>
                    <WhatsApp color="#10bf3e" />
                    <Facebook color="#5e83d8" />
                </div>
            </div>
        </div>
    );
};
