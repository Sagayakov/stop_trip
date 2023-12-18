import { LogoHeader } from 'shared/ui/icons/icons-tools/LogoHeader.tsx';
import { Telegram } from 'shared/ui/icons/contacts/Telegram.tsx';
import { WhatsApp } from 'shared/ui/icons/contacts/WhatsApp.tsx';
import { Facebook } from 'shared/ui/icons/contacts/Facebook.tsx';
import styles from 'widgets/footer/footer.module.scss'
export const FooterBottomDesctop = () => {
    return (
        <div className={styles.footer_bot}>
            <LogoHeader isFooter={true} />
            <div className={styles.contacts}>
                <p>admin@gmail.com</p>
                <div className={styles.contacts_logo}>
                    <Telegram color="#3968aa" />
                    <WhatsApp color="#10bf3e" />
                    <Facebook color="#5e83d8" />
                </div>
            </div>
        </div>
    );
}