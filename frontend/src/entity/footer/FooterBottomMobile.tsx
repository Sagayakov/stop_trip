import { Telegram } from 'shared/ui/icons/contacts/Telegram.tsx';
import { WhatsApp } from 'shared/ui/icons/contacts/WhatsApp.tsx';
import { Facebook } from 'shared/ui/icons/contacts/Facebook.tsx';
import styles from 'widgets/footer/footer.module.scss';
import { Link } from 'react-router-dom';

export const FooterBottomMobile = () => {
    return (
        <div className={styles.footer_bot}>
            <div className={styles.contacts}>
                <Link to="https://t.me/StopTripAdmin" target="_blank">
                    <Telegram color="#3968aa" />
                </Link>
                <WhatsApp color="#10bf3e" />
                <Facebook color="#5e83d8" />
            </div>
            <a
                href="mailto:admin@gmail.com"
                target="_blank"
                className={styles.email_link}
            >
                admin@gmail.com
            </a>
        </div>
    );
};
