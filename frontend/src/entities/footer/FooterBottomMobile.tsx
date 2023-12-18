import { Telegram } from 'shared/ui/icons/contacts/Telegram.tsx';
import { WhatsApp } from 'shared/ui/icons/contacts/WhatsApp.tsx';
import { Facebook } from 'shared/ui/icons/contacts/Facebook.tsx';
import styles from 'widgets/footer/footer.module.scss'

export const FooterBottomMobile = () => {
    return (
        <div className={styles.footer_bot}>
            <div className={styles.contacts}>
                <Telegram color="#3968aa" />
                <WhatsApp color="#10bf3e" />
                <Facebook color="#5e83d8" />
            </div>
            admin@gmail.com
        </div>
    );
}