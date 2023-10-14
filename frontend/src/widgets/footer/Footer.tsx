import { useEffect, useState } from 'react';
import { FeedbackForm } from '../../features/footer';
import { Facebook } from '../../shared/ui/icons/contacts/Facebook';
import { Telegram } from '../../shared/ui/icons/contacts/Telegram';
import { WhatsApp } from '../../shared/ui/icons/contacts/WhatsApp';
import { LogoHeader } from '../../shared/ui/icons/icons-tools/LogoHeader';
import './footer.scss';

export const Footer = () => {
    const [width, setWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <footer>
            <div className="footer-wrapper">
                <div className="footer-top">
                    {width >= 768 && <LogoHeader />}
                    <FeedbackForm />
                </div>
                <div className="hr">
                    <hr />
                </div>
                {window.innerWidth < 768 ? (
                    <div className="footer-bot">
                        <LogoHeader />
                        <div className="contacts">
                            <p>admin@gmail.com</p>
                            <div className="contacts-logo">
                                <Telegram color="#3968aa" />
                                <WhatsApp color="#10bf3e" />
                                <Facebook color="#5e83d8" />
                            </div>
                        </div>
                    </div>
                ) : (
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
