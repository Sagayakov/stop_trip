import { FeedbackForm } from 'features/footer';
import { Facebook } from 'shared/ui/icons/contacts/Facebook.tsx';
import { Telegram } from 'shared/ui/icons/contacts/Telegram.tsx';
import { WhatsApp } from 'shared/ui/icons/contacts/WhatsApp.tsx';
import { LogoHeader } from 'shared/ui/icons/icons-tools/LogoHeader.tsx';
import './footer.scss';
import { useMatchMedia } from 'app/hooks/useMatchMedia.ts';

export const Footer = () => {
    const { isMobile } = useMatchMedia();

    return (
        <footer>
            <div className="footer-wrapper">
                <div className="footer-top">
                    {!isMobile && <LogoHeader isFooter={true} />}
                    <FeedbackForm />
                </div>
                <div className="hr">
                    <hr />
                </div>
                {isMobile && (
                    <div className="footer-bot">
                        <LogoHeader isFooter={true} />
                        <div className="contacts">
                            <p>admin@gmail.com</p>
                            <div className="contacts-logo">
                                <Telegram color="#3968aa" />
                                <WhatsApp color="#10bf3e" />
                                <Facebook color="#5e83d8" />
                            </div>
                        </div>
                    </div>
                )}
                {!isMobile && (
                    <div className="footer-bot">
                        <div className="contacts">
                            <Telegram color="#3968aa" />
                            <WhatsApp color="#10bf3e" />
                            <Facebook color="#5e83d8" />
                        </div>
                        admin@gmail.com
                    </div>
                )}
            </div>
        </footer>
    );
};
